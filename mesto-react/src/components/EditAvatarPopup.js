import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avaRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avaRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="form__field">
            <input
              ref={avaRef}
              defaultValue={""}
              className="form__input"
              id="input_avatar_link"
              type="url"
              name="form_avatar"
              placeholder="Ссылка"
              required
            />
            <span id="error-input_avatar_link" className="error"></span>
          </label>
        </>
      }
      buttonText={"Сохранить"}
    />
  );
}

export default EditAvatarPopup;
