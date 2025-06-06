import "./ConfirmDeleteModal.css";
import CloseIcon from "../../assets/Closebutton.svg";

function ConfirmDeleteModal({ onClose, onConfirm }) {
  return (
    <div className="modal modal_type_confirm modal_open">
      <div className="modal__confirm">
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          <img src={CloseIcon} alt="Close" className="modal__close-icon" />
        </button>
        <p className="modal__confirm-message">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
            <div className="modal__confirm-buttons">
            <button className="modal__delete-button" onClick={onConfirm}>
                Yes, delete item
            </button>
            <button className="modal__cancel-button" onClick={onClose}>
                Cancel
            </button>
          </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;

