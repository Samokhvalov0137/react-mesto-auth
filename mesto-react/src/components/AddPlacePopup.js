import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="form__field">
            <input
              value={name}
              onChange={handleChangeName}
              className="form__input"
              id="input_add_place"
              type="text"
              name="form_place"
              placeholder="Название"
              required
              minLength="2"
              maxLength={30}
            />
            <span id="error-input_add_place" className="error"></span>
          </label>
          <label className="form__field">
            <input
              value={link}
              onChange={handleChangeLink}
              className="form__input"
              id="input_add_link"
              type="url"
              name="form_link"
              placeholder="Ссылка"
              required
            />
            <span id="error-input_add_link" className="error"></span>
          </label>
        </>
      }
      buttonText={"Создать"}
    />
  );
}

export default AddPlacePopup;
