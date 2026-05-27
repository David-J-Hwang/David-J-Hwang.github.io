"use client";

import { useEffect, useId, useState } from "react";

const DEFAULT_CITY = "Ulsan";

const cardBaseClassName =
  "rounded-lg border border-emerald-100 bg-white/70 shadow-sm shadow-emerald-950/5 dark:border-emerald-900 dark:bg-white/5 dark:shadow-black/20";

const pm25CaiBreakpoints = [
  { concentrationLow: 0, concentrationHigh: 15, indexLow: 0, indexHigh: 50 },
  { concentrationLow: 15, concentrationHigh: 35, indexLow: 51, indexHigh: 100 },
  { concentrationLow: 35, concentrationHigh: 75, indexLow: 101, indexHigh: 250 },
  { concentrationLow: 75, concentrationHigh: 500, indexLow: 251, indexHigh: 500 },
];

const pm10CaiBreakpoints = [
  { concentrationLow: 0, concentrationHigh: 30, indexLow: 0, indexHigh: 50 },
  { concentrationLow: 30, concentrationHigh: 80, indexLow: 51, indexHigh: 100 },
  { concentrationLow: 80, concentrationHigh: 150, indexLow: 101, indexHigh: 250 },
  { concentrationLow: 150, concentrationHigh: 600, indexLow: 251, indexHigh: 500 },
];

function getPollutantCai(concentration, breakpoints) {
  if (concentration === null || concentration === undefined) {
    return null;
  }

  const maxConcentration = breakpoints[breakpoints.length - 1].concentrationHigh;
  const clampedConcentration = Math.min(
    Math.max(concentration, 0),
    maxConcentration,
  );
  const range =
    breakpoints.find(
      ({ concentrationLow, concentrationHigh }) =>
        clampedConcentration >= concentrationLow &&
        clampedConcentration <= concentrationHigh,
    ) || breakpoints[breakpoints.length - 1];

  const score =
    ((range.indexHigh - range.indexLow) /
      (range.concentrationHigh - range.concentrationLow)) *
      (clampedConcentration - range.concentrationLow) +
    range.indexLow;

  return Math.round(score);
}

function getAirQualityScore(airQuality) {
  const pm10Score = getPollutantCai(airQuality?.pm10, pm10CaiBreakpoints);
  const pm25Score = getPollutantCai(airQuality?.pm25, pm25CaiBreakpoints);
  const scores = [pm10Score, pm25Score].filter((score) => score !== null);

  return scores.length > 0 ? Math.max(...scores) : null;
}

function getAirQualityClassName(score) {
  if (score === null || score === undefined) {
    return "text-zinc-600 dark:text-zinc-300";
  }

  if (score <= 50) {
    return "text-sky-700 dark:text-sky-300";
  }

  if (score <= 100) {
    return "text-emerald-700 dark:text-emerald-300";
  }

  if (score <= 250) {
    return "text-yellow-600 dark:text-yellow-300";
  }

  return "text-red-700 dark:text-red-300";
}

function formatTemperature(temp) {
  return `${Math.round(temp)}°C`;
}

function getTemperatureClassName(temp) {
  if (temp === null || temp === undefined) {
    return "text-zinc-700 dark:text-zinc-300";
  }

  if (temp <= -10) {
    return "text-purple-700 dark:text-purple-300";
  }

  if (temp < 0) {
    return "text-blue-700 dark:text-blue-300";
  }

  if (temp < 10) {
    return "text-sky-700 dark:text-sky-300";
  }

  if (temp < 20) {
    return "text-amber-600 dark:text-amber-300";
  }

  if (temp < 30) {
    return "text-orange-600 dark:text-orange-300";
  }

  if (temp < 40) {
    return "text-red-700 dark:text-red-300";
  }

  return "text-rose-950 dark:text-red-500";
}

function getWeatherEmoji(condition) {
  if (condition === "Clear") {
    return "*";
  }

  if (condition === "Clouds") {
    return "C";
  }

  if (condition === "Rain" || condition === "Drizzle") {
    return "R";
  }

  if (condition === "Snow") {
    return "S";
  }

  if (condition === "Thunderstorm") {
    return "!";
  }

  return "○";
}

function formatCityTime(timestamp, timezoneOffset) {
  const date = new Date(timestamp + timezoneOffset * 1000);

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(date);
}

export default function WeatherPanel() {
  const [cityInput, setCityInput] = useState(DEFAULT_CITY);
  const [weatherLocation, setWeatherLocation] = useState({
    city: DEFAULT_CITY,
  });
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      setStatus("loading");
      setError("");
      setWeather(null);

      try {
        const params = new URLSearchParams({
          hours: "24",
        });

        if (weatherLocation.lat && weatherLocation.lon) {
          params.set("lat", weatherLocation.lat);
          params.set("lon", weatherLocation.lon);
        } else {
          params.set("city", weatherLocation.city || DEFAULT_CITY);
        }

        const response = await fetch(`/api/weather?${params}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "날씨 정보를 불러오지 못했습니다.");
        }

        setWeather(data);
        setStatus("success");
      } catch (requestError) {
        if (requestError.name === "AbortError") {
          return;
        }

        setWeather(null);
        setError(requestError.message);
        setStatus("error");
      }
    }

    loadWeather();

    return () => controller.abort();
  }, [weatherLocation]);

  const currentTemp = weather?.current?.temperature;
  const currentTempClassName = getTemperatureClassName(currentTemp);
  const airQualityScore = getAirQualityScore(weather?.airQuality);
  const airQualityClassName = getAirQualityClassName(airQualityScore);

  function handleSubmit(event) {
    event.preventDefault();

    const nextCity = cityInput.trim();
    if (nextCity) {
      setWeatherLocation({ city: nextCity });
    }
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setWeather(null);
      setStatus("error");
      setError("이 브라우저에서는 현재 위치를 사용할 수 없습니다.");
      return;
    }

    setIsLocating(true);
    setStatus("loading");
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setWeatherLocation({
          lat: String(position.coords.latitude),
          lon: String(position.coords.longitude),
        });
        setCityInput("현재 위치");
        setIsLocating(false);
      },
      (positionError) => {
        setWeather(null);
        setStatus("error");
        setError(
          positionError.code === positionError.PERMISSION_DENIED
            ? "현재 위치 권한이 허용되지 않았습니다."
            : "현재 위치를 가져오지 못했습니다.",
        );
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }

  const locationLabel = weather
    ? `${weather.city}, ${weather.country}`
    : weatherLocation.lat && weatherLocation.lon
      ? "현재 위치"
      : weatherLocation.city;

  return (
    <section className="w-full overflow-hidden rounded-lg border border-emerald-200 bg-white/85 p-4 text-zinc-900 shadow-xl shadow-emerald-950/10 backdrop-blur dark:border-emerald-900 dark:bg-zinc-950/70 dark:text-zinc-100 dark:shadow-black/30 sm:p-5">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] opacity-80">
              Weather
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">
              {locationLabel}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-row gap-2 lg:max-w-xl"
          >
            <input
              type="search"
              value={cityInput}
              onChange={(event) => setCityInput(event.target.value)}
              onFocus={() => {
                if (cityInput === "현재 위치") {
                  setCityInput("");
                }
              }}
              className="min-h-11 min-w-0 flex-1 rounded-md border border-white/45 bg-white/80 px-3 text-sm font-bold text-zinc-950 outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-white/80 sm:px-4"
              placeholder="Ulsan, 울산, 영국"
              aria-label="도시 이름"
            />
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              aria-label={isLocating ? "현재 위치 확인 중" : "현재 위치 사용"}
              title={isLocating ? "현재 위치 확인 중" : "현재 위치 사용"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/40 bg-white/55 text-zinc-950 shadow-sm transition hover:bg-white/75 focus:outline-none focus:ring-2 focus:ring-white/80 disabled:cursor-wait disabled:opacity-70 dark:bg-white/15 dark:text-white dark:hover:bg-white/25"
            >
              {isLocating ? (
                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent motion-safe:animate-spin" />
              ) : (
                <LocationIcon className="h-5 w-5" />
              )}
            </button>
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-md bg-zinc-950 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-white/80 sm:px-5"
            >
              <span className="sm:hidden">검색</span>
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>

        {status === "error" ? (
          <div className="rounded-lg border border-emerald-200 bg-white/70 p-4 text-sm font-bold text-zinc-800 dark:border-emerald-900 dark:bg-white/5 dark:text-zinc-100">
            {error}
          </div>
        ) : (
          <>
            <div className="grid gap-2 sm:gap-3 lg:grid-cols-5">
              <div className={`${cardBaseClassName} flex min-h-20 items-center justify-center p-3 sm:min-h-28 sm:p-4`}>
                <WeatherIcon
                  icon={weather?.current?.icon}
                  condition={weather?.current?.condition}
                  description={weather?.current?.description}
                  size="current"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:contents">
                <WeatherMetric
                  label="온도"
                  value={
                    currentTemp !== undefined
                      ? formatTemperature(currentTemp)
                      : "--"
                  }
                  valueClassName={currentTempClassName}
                />
                <WeatherMetric
                  label="습도"
                  value={
                    weather?.current?.humidity !== undefined
                      ? `${weather.current.humidity}%`
                      : "--"
                  }
                />
                <WeatherMetric
                  label="풍속"
                  value={
                    weather?.current?.windSpeed !== undefined
                      ? `${Math.round(weather.current.windSpeed)}m/s`
                      : "--"
                  }
                />
                <WeatherMetric
                  label="미세먼지"
                  value={
                    airQualityScore !== null ? String(airQualityScore) : "--"
                  }
                  valueClassName={airQualityClassName}
                />
              </div>
            </div>

            <section>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-300">
                24h Forecast
              </h3>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
                {weather?.forecast?.map((item) => (
                  <div
                    key={item.timestamp}
                    className={`${cardBaseClassName} p-2 text-center sm:p-4`}
                  >
                    <p className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300 sm:text-sm">
                      {formatCityTime(item.timestamp, weather.timezoneOffset)}
                    </p>
                    <div className="mt-2 flex h-10 items-center justify-center sm:mt-3 sm:h-16">
                      <WeatherIcon
                        icon={item.icon}
                        description={item.description}
                        size="forecast"
                      />
                    </div>
                    <p
                      className={`mt-2 text-base font-extrabold sm:mt-3 sm:text-xl ${getTemperatureClassName(
                        item.temperature,
                      )}`}
                    >
                      {item.temperature !== undefined
                        ? formatTemperature(item.temperature)
                        : "--"}
                    </p>
                  </div>
                ))}
                {status === "loading" &&
                  Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className={`${cardBaseClassName} h-28 animate-pulse sm:h-32`}
                    />
                  ))}
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}

function WeatherMetric({
  label,
  value,
  detail,
  valueClassName = "",
}) {
  return (
    <div className={`${cardBaseClassName} min-w-0 p-2 sm:p-4`}>
      <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.08em] opacity-70 sm:text-xs sm:tracking-[0.16em]">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-extrabold leading-tight sm:mt-2 sm:text-2xl ${valueClassName}`}
      >
        {value}
      </p>
      {detail ? (
        <p className={`mt-1 text-sm font-bold ${valueClassName}`}>{detail}</p>
      ) : null}
    </div>
  );
}

function WeatherIcon({ icon, condition, description, size }) {
  const sizeClassName =
    size === "current"
      ? "h-20 w-20 sm:h-24 sm:w-24"
      : size === "forecast"
        ? "h-10 w-10 sm:h-16 sm:w-16"
        : "h-10 w-10";
  const moonSizeClassName =
    size === "current"
      ? "h-16 w-16 sm:h-20 sm:w-20"
      : size === "forecast"
        ? "h-8 w-8 sm:h-12 sm:w-12"
        : "h-8 w-8";

  if (icon === "01n") {
    return (
      <MoonIcon
        className={`${moonSizeClassName} shrink-0 text-amber-300 drop-shadow-sm`}
        title={description || "clear night"}
      />
    );
  }

  if (icon) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description || "weather icon"}
        className={`${sizeClassName} shrink-0`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizeClassName} flex shrink-0 items-center justify-center rounded-md bg-emerald-100 text-3xl font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200`}
    >
      {getWeatherEmoji(condition)}
    </span>
  );
}

function MoonIcon({ className, title }) {
  const maskId = `moon-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <rect width="64" height="64" fill="black" />
          <circle cx="32" cy="32" r="24" fill="white" />
          <circle cx="42" cy="24" r="24" fill="black" />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="24" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
