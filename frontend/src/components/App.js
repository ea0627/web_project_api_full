// frontend/src/components/App.js
import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import InfoTooltip from './InfoTooltip';
import Header from './Header';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const history = useHistory();

  const [cards, setCards] = React.useState([]);
  const [token, setToken] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  /* ======================
     POPUPS
  ====================== */
  function closeAllPopups() {
    setIsTooltipOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  /* ======================
     LOGIN
  ====================== */
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (!data.token) return;

        localStorage.setItem('jwt', data.token);
        setToken(data.token);
        api.setToken(data.token);

        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch(console.log);
  }

  /* ======================
     REGISTER
  ====================== */
  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
        history.push('/signin');
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  /* ======================
     UPDATE USER (name/about)
  ====================== */
  function handleUpdateUser({ name, about }) {
    api.updateUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.log);
  }

  /* ======================
     UPDATE AVATAR
  ====================== */
  function handleUpdateAvatar(avatarUrl) {
    api.updateAvatar({ avatar: avatarUrl })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  /* ======================
     ADD CARD
  ====================== */
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  /* ======================
     LIKE CARD
  ====================== */
  function handleCardLike(card) {
    const isLiked = card.likes?.some((i) => i === currentUser._id || i?._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked) // 👈 aquí va NEGADO
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(console.log);
  }

  /* ======================
     DELETE CARD
  ====================== */
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.log);
  }

  /* ======================
     CHECK TOKEN ON MOUNT
  ====================== */
  React.useEffect(() => {
    const savedToken = localStorage.getItem('jwt');
    if (!savedToken) return;

    setToken(savedToken);
    api.setToken(savedToken);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cardsData]) => {
        setCurrentUser(user);
        setCards(cardsData);
        setLoggedIn(true);
        setEmail(user.email);
        history.push('/');
      })
      .catch(() => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setEmail('');
        setToken(null);
        setCurrentUser({});
        setCards([]);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ======================
     LOGOUT
  ====================== */
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    setToken(null);
    setCurrentUser({});
    setCards([]);
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
        />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={() => {}}
              onEditAvatar={handleEditAvatarClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Redirect to="/signin" />
        </Switch>

        {/* Popups */}
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
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;