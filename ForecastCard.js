export default function ForecastCard({ day }) {
  return (
    <div className="forecast-card">
      <h4>
        {new Date(day.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </h4>

      <img
        className="icon-small"
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt=""
      />

      <p>{day.weather[0].main}</p>
      <p>{Math.round(day.main.temp)}°C</p>
    </div>
  );
}
