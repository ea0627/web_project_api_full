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

  /* ======================
     POPUPS
  ====================== */
  function closeAllPopups() {
    setIsTooltipOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
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

  /*return <h1 style={{ color: 'white' }}>App render ✅</h1>;*/

  
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