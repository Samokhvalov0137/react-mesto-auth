import React from "react";
import Main from "./landing/Main";


function Content({
  handleCardClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleEditAvatarClick,
  cards,
  handleCardLike,
  handleDeleteCard,
}) {
  return (
      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
      />
  );
}

export default Content;