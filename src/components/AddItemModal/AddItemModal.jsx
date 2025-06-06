import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const isFormInvalid = !name || !imageUrl || !weather;

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      _id: Date.now().toString(),
      name,
      link: imageUrl,
      weather,
    };

    onAddItem(newItem);
  }

  return (
    <ModalWithForm
      name="add"
      title="New garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isDisabled={isFormInvalid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
  );
}

export default AddItemModal;
