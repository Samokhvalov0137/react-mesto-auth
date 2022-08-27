import { useEffect, useState } from "react";
import "../../src/index.css";
import Header from "./landing/Header";
import Main from "./landing/Main";
import Footer from "./landing/Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "Name",
    about: "About youself",
    avatar: "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCardsArray()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`getCardsArray ошибка - ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id,
        });
      })
      .catch((err) => {
        console.log(`getUserInfo ошибка - ${err}`);
      });
  }, []);

  function handleDeleteCard(removedCard) {
    api
      .deleteCard(removedCard._id)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return removedCard._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(`deleteCard ошибка - ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`toggleLike ошибка - ${err}`);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .patchUserAvatar(link)
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`patchUserAvatar ошибка - ${err}`);
      });
  }

  function handleUpdateUser(user) {
    api
      .patchUserInfo(user)
      .then((updateUserInfo) => {
        setCurrentUser(updateUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`patchUserInfo ошибка - ${err}`);
      });
  }

  function handleAddPlace(card) {
    api
      .postCardData(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`postCardData ошибка - ${err}`);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          name={"delete"}
          title={"Вы уверены?"}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          buttonText={"Да"}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
