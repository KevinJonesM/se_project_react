import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { getWeatherData, getWeatherType } from "../../utils/weatherApi";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { defaultCoords } from "../../utils/constants";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [fullWeatherData, setFullWeatherData] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState("");

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  function handleToggleUnit(unit) {
    setCurrentTemperatureUnit(unit);
  }

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

    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.log("Error al obtener ropa:", err));
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
    setShowConfirmDelete(false);
    setItemToDelete(null);
  }

  function handleAddItem(item) {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeAllModals();
      })
      .catch((err) => console.log("Error al agregar ítem:", err));
  }

  function handleCardDelete(item) {
    setActiveModal("");
    setSelectedCard(null);
    setItemToDelete(item);
    setShowConfirmDelete(true);
  }

  function confirmDeleteItem() {
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((clothing) => clothing._id !== itemToDelete._id)
        );
        closeAllModals();
      })
      .catch((err) => console.log("Error al eliminar ítem:", err));
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleUnit }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onAddClothesClick={handleAddClothesClick}
            temperature={temperature}
            city={city}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  fullWeatherData={fullWeatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  temperature={temperature}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClothesClick={handleAddClothesClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        {activeModal === "add" && (
          <AddItemModal
            isOpen={activeModal === "add"}
            onAddItem={handleAddItem}
            onCloseModal={closeAllModals}
          />
        )}

        {activeModal === "preview" && selectedCard && (
          <ItemModal
            item={selectedCard}
            onClose={closeAllModals}
            onCardDelete={handleCardDelete}
          />
        )}

        {showConfirmDelete && (
          <ConfirmDeleteModal
            onClose={() => setShowConfirmDelete(false)}
            onConfirm={confirmDeleteItem}
          />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
