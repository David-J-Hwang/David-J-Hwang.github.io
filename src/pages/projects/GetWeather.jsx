import { useState } from "react";

const API_KEY = "ac1d3a2c91c6775a8e53b92b7fc6ebca";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// OpenWeatherMap API 응답예시
// {
//     "coord": {
//         "lon": 129.3167,
//         "lat": 35.5372
//     },
//     "weather": [
//         {
//             "id": 803,
//             "main": "Clouds",
//             "description": "broken clouds",
//             "icon": "04n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": -0.52,
//         "feels_like": -0.52,
//         "temp_min": -0.52,
//         "temp_max": -0.52,
//         "pressure": 1024,
//         "humidity": 72,
//         "sea_level": 1024,
//         "grnd_level": 1008
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 1.23,
//         "deg": 260,
//         "gust": 0.51
//     },
//     "clouds": {
//         "all": 51
//     },
//     "dt": 1740509102,
//     "sys": {
//         "country": "KR",
//         "sunrise": 1740520623,
//         "sunset": 1740561280
//     },
//     "timezone": 32400,
//     "id": 1833747,
//     "name": "Ulsan",
//     "cod": 200
// }

const GetWeather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
      if (!response.ok) throw new Error("Invalid city name!");

      const data = await response.json();
      console.log(data);
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
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
    <div className="flex flex-col items-center justify-center m-8">
      <div className="m-6 p-3">
        <h1 className="text-6xl m-3">Get Weather</h1>
        <div>
          <p className="text-center p-3">
            Get weather info from{" "}
            <a href="https://openweathermap.org">OpenWeather.org</a>
          </p>
          <p className="text-center p-3">Check the weather of your city! :)</p>
        </div>
      </div>
      <div className="w-[50%] h-[80vh] bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl shadow-xl p-6 flex flex-col items-center">
        {/* 검색 입력 필드 */}
        <div className="flex w-full mb-4 bg-white rounded-2xl">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-6 py-3 rounded-l-xl font-sans text-gray-900 outline-none"
          />
          <button
            onClick={fetchWeather}
            className="bg-white text-gray-900 px-4 rounded-r-xl hover:bg-gray-200"
          >
            🔍
          </button>
        </div>

        {error && <p className="text-red-300">Invalid city name!</p>}

        {weather && (
          <div className="flex flex-col text-center p-18">
            <span className="text-8xl">
              {getWeatherIcon(weather.condition)}
            </span>
            <h1 className="text-7xl font-bold m-2">{weather.temp}°C</h1>
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
    </div>
  );
};

export default GetWeather;
