import { useContext } from "react";
import Card from "../Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={avatar} alt="аватар" />
        <button
          className="profile__button profile__button-avatar"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__button profile__button-edit"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__status">{about}</p>
        </div>
        <button
          className="profile__button profile__button-add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteCard={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
