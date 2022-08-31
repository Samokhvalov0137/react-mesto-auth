import { useEffect, useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import "../../src/index.css";
import Header from "./landing/Header";
import Footer from "./landing/Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import FormRegLog from "./FormRegLog";
import Content from "./Content";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    error: false,
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "Name",
    about: "About youself",
    avatar:
      "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg",
  });

  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("jwt");
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .getCardsArray()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(`getCardsArray ошибка - ${err}`);
        });

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
    }
  }, [loggedIn]);

  useEffect(() => {
    api
      .identificationUser(token)
      .then((data) => {
        setEmail(data.data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(`identificationUser ошибка - ${err}`);
      });
  }, []);

  function handleExitProfile() {
    setLoggedIn(false);
    localStorage.setItem("jwt", "");
  }

  function handleRegistrationUser(email, password) {
    api
      .signUp(email, password)
      .then(() => {
        setIsInfoTooltip({ isOpen: true, error: false });
        history.push("./sing-in");
      })
      .catch((err) => {
        setIsInfoTooltip({ isOpen: true, error: true });
        console.log(`singUp ошибка - ${err}`);
      });
  }

  function handleLoginUser(email, password) {
    api
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setIsInfoTooltip({ isOpen: true, error: true });
        console.log(`singIn ошибка - ${err}`);
      });
  }

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
    setIsInfoTooltip({ isOpen: false, error: false });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} handleExitProfile={handleExitProfile} />
        <Switch>
          <Route path="/sign-in">
            <FormRegLog
              onSubmit={handleLoginUser}
              titleForm="Вход"
              buttonText="Войти"
            />
          </Route>

          <Route path="/sign-up">
            <FormRegLog
              onSubmit={handleRegistrationUser}
              titleForm="Регистрация"
              buttonText="Зарегистрироваться"
              regDescription={
                <Link to="/sing-up" className="auth_form-link">
                  Уже зарегистрированы? Войти
                </Link>
              }
            />
          </Route>

          <ProtectedRoute
            path="/"
            handleExitProfile={handleExitProfile}
            loggedIn={loggedIn}
            component={Content}
            currentUser={currentUser}
            email={email}
            handleCardClick={handleCardClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleEditAvatarClick={handleEditAvatarClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleDeleteCard={handleDeleteCard}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            handleUpdateUser={handleUpdateUser}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            handleUpdateAvatar={handleUpdateAvatar}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            handleAddPlace={handleAddPlace}
            isConfirmPopupOpen={isConfirmPopupOpen}
            selectedCard={selectedCard}
            isImagePopupOpen={isImagePopupOpen}
          />
        </Switch>
        <Footer />

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

        <InfoTooltip
          isOpen={isInfoTooltip.isOpen}
          onClose={closeAllPopups}
          error={isInfoTooltip.error}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
