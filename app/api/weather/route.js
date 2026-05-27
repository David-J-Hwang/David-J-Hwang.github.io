import { NextResponse } from "next/server";
import { normalizeLocationQuery } from "./locationAliases";

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const DEFAULT_CITY = "Ulsan";

function buildOpenWeatherUrl(path, params) {
  const url = new URL(`${OPENWEATHER_BASE_URL}/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  return url;
}

async function fetchOpenWeather(url, label) {
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message =
      response.status === 401
        ? "OpenWeather API key is invalid or not active yet."
        : error.message || `${label} request failed`;
    throw new Error(message);
  }

  return response.json();
}

export async function GET(request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENWEATHER_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim() || DEFAULT_CITY;
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");
  const forecastHours = Number(searchParams.get("hours") || 24);
  const forecastCount = Math.min(Math.max(Math.ceil(forecastHours / 3), 4), 8);

  try {
    const currentUrl =
      latitude && longitude
        ? buildOpenWeatherUrl("weather", {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: "metric",
            lang: "kr",
          })
        : buildOpenWeatherUrl("weather", {
            q: normalizeLocationQuery(city),
            appid: apiKey,
            units: "metric",
            lang: "kr",
          });

    const current = await fetchOpenWeather(currentUrl, "Current weather");
    const { lat, lon } = current.coord;

    const forecastUrl = buildOpenWeatherUrl("forecast", {
      lat,
      lon,
      appid: apiKey,
      units: "metric",
      lang: "kr",
      cnt: forecastCount,
    });

    const airPollutionUrl = buildOpenWeatherUrl("air_pollution", {
      lat,
      lon,
      appid: apiKey,
    });

    const [forecast, airPollution] = await Promise.all([
      fetchOpenWeather(forecastUrl, "Forecast"),
      fetchOpenWeather(airPollutionUrl, "Air pollution"),
    ]);

    return NextResponse.json({
      city: current.name,
      country: current.sys?.country,
      timezoneOffset: current.timezone,
      updatedAt: current.dt * 1000,
      current: {
        condition: current.weather?.[0]?.main,
        description: current.weather?.[0]?.description,
        icon: current.weather?.[0]?.icon,
        temperature: current.main?.temp,
        feelsLike: current.main?.feels_like,
        humidity: current.main?.humidity,
        windSpeed: current.wind?.speed,
      },
      forecast: forecast.list.slice(0, forecastCount).map((item) => ({
        timestamp: item.dt * 1000,
        temperature: item.main?.temp,
        description: item.weather?.[0]?.description,
        icon: item.weather?.[0]?.icon,
        precipitationProbability: item.pop ?? 0,
      })),
      airQuality: {
        aqi: airPollution.list?.[0]?.main?.aqi,
        pm25: airPollution.list?.[0]?.components?.pm2_5,
        pm10: airPollution.list?.[0]?.components?.pm10,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to load weather data." },
      { status: 502 },
    );
  }
}
