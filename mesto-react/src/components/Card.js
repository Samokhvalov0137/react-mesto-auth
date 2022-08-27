import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteCard }) {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteCard(card);
  }

  const user = useContext(CurrentUserContext);
  const isOwn = user.id === card.owner._id;
  const isLiked = card.likes.some((like) => like._id === user.id);
  const cardLikeButtonClass = `${
    isLiked ? "element__vector element__vector_active" : "element__vector"
  }`;

  return (
    <article className="element">
      <img
        className="element__photo"
        src={card.link}
        id="card-image"
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        {isOwn && (
          <button
            className="element__trash"
            onClick={handleDeleteClick}
          ></button>
        )}
        <div className="element__vector-container">
          <button
            type="button"
            className={cardLikeButtonClass}
            onClick={handleLikeClick}
          ></button>
          <p className="element__vector-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
