import "./WeatherCard.css";
import { getWeatherBackground } from "../../utils/weatherUtils";

import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const weatherId = weatherData.weather[0].id;
  const sunrise = weatherData.sys.sunrise;
  const sunset = weatherData.sys.sunset;
  const currentTime = Date.now() / 1000;
  const isDay = currentTime >= sunrise && currentTime < sunset;

  const backgroundImage = getWeatherBackground(weatherId, isDay);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const tempF = Math.round(weatherData.main.temp);

  const tempC = Math.round((tempF - 32) * 5 / 9);

  const displayTemp = currentTemperatureUnit === "C" ? tempC : tempF;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {displayTemp}°{currentTemperatureUnit}
      </p>
      <img
        src={backgroundImage}
        alt="Weather Background"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

