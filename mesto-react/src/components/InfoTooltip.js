import React from "react";
import { Redirect } from "react-router-dom";

function InfoTooltip({ onClose, isOpen, error }) {
  console.log(isOpen);
  if (isOpen) {
    return (
      <div className="tooltip">
        <div className="tooltip__overlay" onClick={onClose}></div>
        <div className="tooltip__container">
          <button
            onClick={onClose}
            className="tooltip__close"
            type="button"
          ></button>
          {error ? (
            <>
              <img
                className="tooltip__image"
                src={require("../images/cancel.png")}
                alt="Ошибка регистрация"
              />
              <span className="tooltip__title">
                Что-то пошло не так! Попробуйте ещё раз.
              </span>
            </>
          ) : (
            <>
              <img
                className="tooltip__image"
                src={require("../images/accept.png")}
                alt="Успешная регистрация"
              />
              <span className="tooltip__title">
                Вы успешно зарегистрировались!
              </span>
              <Redirect to="./sing-in" />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default InfoTooltip;
