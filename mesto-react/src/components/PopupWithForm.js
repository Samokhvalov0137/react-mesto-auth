import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen = false,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}  `}>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__input">
          <h2 className="popup__title">{title}</h2>
          <form className="form" name={name} noValidate onSubmit={onSubmit}>
            <fieldset className="form__set">
              {children}
              <button className="popup__submit-btn" type="submit">
                {buttonText}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
