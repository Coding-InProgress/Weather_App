import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import RecentSearches from "./components/RecentSearches";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/recent").then((res) => {
      setRecent(res.data);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        axios
          .get(`http://localhost:5000/api/weather/coords/${latitude}/${longitude}`)
          .then((res) => {
            setWeather(res.data);
            setCity(res.data.name);
          })
          .catch(() => console.log("GPS weather fetch failed"));
      },
      () => console.log("User blocked GPS access")
    );
  }, []);

  const search = async () => {
    if (!city) return;

    try {
      const w = await axios.get(`http://localhost:5000/api/weather/${city}`);
      const f = await axios.get(`http://localhost:5000/api/forecast/${city}`);

      setWeather(w.data);

      const daily = f.data.list.filter((item, index) => index % 8 === 0);
      setForecast(daily);

      const recentList = await axios.get("http://localhost:5000/api/recent");
      setRecent(recentList.data);

    } catch {
      alert("City not found");
    }
  };

  const getBackground = () => {
    if (!weather) return "default-bg";

    let bg = weather.weather[0].main.toLowerCase();

    if (bg.includes("haze") || bg.includes("mist") || bg.includes("fog")) {
      return "haze-bg";
    }
    if (bg.includes("cloud")) return "cloudy-bg";
    if (bg.includes("rain")) return "rainy-bg";
    if (bg.includes("clear")) return "sunny-bg";

    return "default-bg";
  };

  return (
    <div className={`app ${getBackground()}`}>
      <h1 className="title">🌦 Weather App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      <RecentSearches list={recent} setCity={setCity} />

      {weather && <WeatherCard weather={weather} />}

      {forecast.length > 0 && (
        <div className="forecast-container">
          {forecast.map((day, idx) => (
            <ForecastCard key={idx} day={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
