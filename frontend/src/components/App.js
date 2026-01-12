import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import InfoTooltip from './InfoTooltip';

import api from '../utils/api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';

function App() {
  const history = useHistory();

  const [token, setToken] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  /* ======================
    LOGIN
  ====================== */
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (!data.token) return;

        localStorage.setItem('jwt', data.token);
        setToken(data.token);

        api.setToken(data.token); // ✅

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
     CHECK TOKEN ON MOUNT
  ====================== */
  React.useEffect(() => {
    const savedToken = localStorage.getItem('jwt');
    if (!savedToken) return;

    setToken(savedToken);
    api.setToken(savedToken); // ✅

  // ✅ validamos token pidiendo /users/me
  api.getUserInfo()
    .then((user) => {
      setCurrentUser(user);
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
     LOAD USER INFO
  ====================== */
 /* React.useEffect(() => {
    if (!loggedIn) return;

    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.log);
  }, [loggedIn]); */

  /* ======================
     LOGOUT
  ====================== */
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    setToken(null);
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
            <Main onSignOut={handleSignOut} />
          </ProtectedRoute>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Redirect to="/signin" />
        </Switch>

        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={() => setIsTooltipOpen(false)}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;