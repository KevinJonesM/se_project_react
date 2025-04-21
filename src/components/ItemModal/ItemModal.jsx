import { useEffect } from "react";
import "./ItemModal.css";
import Closebuttonwhite from "../../assets/Closebuttonwhite.svg";

function ItemModal({ item, onClose }) {
  if (!item) return null;

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal modal_type_preview" onClick={handleOverlayClick}>
      <div className="modal__preview">
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          <img src={Closebuttonwhite} alt="Close" className="modal__close-icon" />
        </button>
        <img
          src={item.link}
          alt={item.name}
          className="modal__preview-image"
        />
        <h2 className="modal__preview-title">{item.name}</h2>
        <p className="modal__preview-weather">Weather: {item.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
