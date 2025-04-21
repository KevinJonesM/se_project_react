import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, fullWeatherData, clothingItems, onCardClick, temperature }) {
  return (
    <main className="main">
      <WeatherCard weatherData={fullWeatherData} />
      
      <section className="cards">
        <p className="cards__text">
          Today is {temperature}°F / You may want to wear:
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
