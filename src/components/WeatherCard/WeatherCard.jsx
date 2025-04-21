import "./WeatherCard.css";
import { getWeatherBackground } from "../../utils/weatherUtils";

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const weatherId = weatherData.weather[0].id;
  const sunrise = weatherData.sys.sunrise;
  const sunset = weatherData.sys.sunset;
  const currentTime = Date.now() / 1000;
  const isDay = currentTime >= sunrise && currentTime < sunset;

  const backgroundImage = getWeatherBackground(weatherId, isDay);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{Math.round(weatherData.main.temp)} &deg; F</p>
      <img
        src={backgroundImage}
        alt="Weather Background"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
