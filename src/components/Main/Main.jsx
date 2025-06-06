import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, fullWeatherData, clothingItems, onCardClick, temperature }) {

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayTemp =
    currentTemperatureUnit === "C"
      ? Math.round(((temperature - 32) * 5) / 9)
      : temperature;

  return (
    <main className="main">
      <WeatherCard weatherData={fullWeatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp}°{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
