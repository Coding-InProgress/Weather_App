export default function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>

      <img
        className="icon"
        style={{ width: "120px" }}
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="weather icon"
      />

      <p className="desc">{weather.weather[0].description}</p>

      <h3>
        {weather.main?.temp ? Math.round(weather.main.temp) + "°C" : "N/A"}
      </h3>

      <p>Humidity: {weather.main?.humidity ?? "N/A"}%</p>
      <p>Wind: {weather.wind?.speed ?? "N/A"} m/s</p>
    </div>
  );
}
