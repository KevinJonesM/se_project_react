import "./ModalWithForm.css";
import { useEffect } from "react";
import Closebutton from "../../assets/Closebutton.svg";

function ModalWithForm({ name, title, buttonText, onClose, onSubmit, children, isDisabled }) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  }

  return (
    <div className={`modal modal_type_${name} modal_opened`} onClick={handleOverlayClick}>
      <form className="modal__form" onSubmit={onSubmit}>
        <h2 className="modal__title">{title}</h2>

        <button
          type="button"
          className="modal__close"
          aria-label="Close modal"
          onClick={onClose}
        >
          <img src={Closebutton} alt="Close" className="modal__close-icon" />
        </button>

        {children}

        <button type="submit" className="modal__submit" disabled={isDisabled}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
