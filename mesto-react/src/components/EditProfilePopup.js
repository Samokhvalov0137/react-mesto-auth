import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="form__field">
            <input
              onChange={handleChangeName}
              value={name}
              className="form__input"
              id="form_name"
              type="text"
              name="form_name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span id="error-form_name" className="error"></span>
          </label>
          <label className="form__field">
            <input
              onChange={handleChangeAbout}
              value={about}
              className="form__input"
              id="form_status"
              type="text"
              name="form_status"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"
            />
            <span id="error-form_status" className="error"></span>
          </label>
        </>
      }
      buttonText={"Сохранить"}
    />
  );
}

export default EditProfilePopup;
