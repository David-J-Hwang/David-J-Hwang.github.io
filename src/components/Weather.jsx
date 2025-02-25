import { useState } from "react";

const API_KEY = "ac1d3a2c91c6775a8e53b92b7fc6ebca";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
      if (!response.ok) throw new Error("Invalid city name!");

      const data = await response.json();
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].main,
      });
      setError(false);
    } catch {
      setWeather(null);
      setError(true);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return "☁️";
      case "Clear":
        return "☀️";
      case "Drizzle":
        return "🌦️";
      case "Mist":
        return "🌫️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      default:
        return "🌍";
    }
  };

  return (
    <div className="w-[50%] h-[50vh] bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl shadow-xl p-6 flex flex-col items-center">
      {/* 검색 입력 필드 */}
      <div className="flex w-full mb-4 bg-white">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-l-lg text-gray-900 outline-none"
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-gray-900 px-4 rounded-r-lg hover:bg-gray-200"
        >
          🔍
        </button>
      </div>

      {error && <p className="text-red-300">Invalid city name!</p>}

      {weather && (
        <div className="text-center">
          <span className="text-6xl">{getWeatherIcon(weather.condition)}</span>
          <h1 className="text-5xl font-bold mt-2">{weather.temp}°C</h1>
          <h2 className="text-2xl mt-1">{weather.name}</h2>

          <div className="flex justify-between mt-6 w-64 text-lg">
            <div className="flex items-center">
              💧 <span className="ml-2">{weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              🌬️ <span className="ml-2">{weather.wind} km/h</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
