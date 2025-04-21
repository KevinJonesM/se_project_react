import { getWeatherData, getWeatherType } from "../../utils/weatherApi";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems, defaultCoords, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [fullWeatherData, setFullWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [nameInput, setNameInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState("");

  const formIsInvalid = !nameInput || !imageUrl || !weather;

  useEffect(() => {
    getWeatherData(defaultCoords.latitude, defaultCoords.longitude)
      .then((data) => {
        const temp = Math.round(data.main.temp);
        const cityName = data.name;
        const weatherType = getWeatherType(temp);

        setTemperature(temp);
        setCity(cityName);
        setWeatherData({ type: weatherType });
        setFullWeatherData(data);
      })
      .catch((err) => {
        console.log("Error al obtener el clima:", err);
      });
  }, []);

  function handleAddClothesClick() {
    setActiveModal("add");
  }

  function handleCardClick(item) {
    setSelectedCard(item);
    setActiveModal("preview");
  }

  function closeAllModals() {
    setActiveModal("");
    setSelectedCard(null);
    setNameInput("");
    setImageUrl("");
    setWeather("");
  }

  function handleAddItemSubmit(e) {
    e.preventDefault();
    const newItem = {
      _id: Date.now(),
      name: nameInput,
      link: imageUrl,
      weather,
    };
    setClothingItems([newItem, ...clothingItems]);
    closeAllModals();
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header
          onAddClothesClick={handleAddClothesClick}
          temperature={temperature}
          city={city}
        />
        <Main
          weatherData={weatherData}
          fullWeatherData={fullWeatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
          temperature={temperature}
        />
        <Footer />
      </div>

      {activeModal === "add" && (
        <ModalWithForm
          name="add"
          title="New garment"
          buttonText="Add garment"
          onClose={closeAllModals}
          onSubmit={handleAddItemSubmit}
          isDisabled={formIsInvalid}
        >
          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              placeholder="Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </label>

          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            {["hot", "warm", "cold"].map((option) => (
              <div className="modal__radio-option" key={option}>
                <input
                  id={option}
                  type="radio"
                  name="weather"
                  value={option}
                  className="modal__radio-input"
                  checked={weather === option}
                  onChange={(e) => setWeather(e.target.value)}
                  required
                />
                <label htmlFor={option} className="modal__label_type_radio">
                  {option[0].toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
          </fieldset>
        </ModalWithForm>
      )}

      {activeModal === "preview" && selectedCard && (
        <ItemModal item={selectedCard} onClose={closeAllModals} />
      )}
    </div>
  );
}

export default App;
