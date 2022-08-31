import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  if (isOpen) {
    return (
      <div className="popup popup_images popup_opened">
        <div className="popup__elements">
          <button
            type="button"
            className="popup__close"
            id="popup-card__close"
            onClick={onClose}
          ></button>
          <div className="popup__card">
            <img className="popup__image" src={card.link} alt={card.name} />
            <p className="popup__name">{card.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ImagePopup;
