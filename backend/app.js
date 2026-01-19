const express = require('express');
const { errors } = require('celebrate');

const { login, createUser, getCurrentUser, updateProfile } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const {
    signupValidation,
    signinValidation,
    updateProfileValidation,
} = require('./middlewares/validation');

// 👇 tus loggers (ejemplo)
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// 1) request logger ANTES de todo
app.use(requestLogger);

// 2) parseo JSON
app.use(express.json());

// 3) rutas públicas
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// 4) auth para todo lo demás
app.use(auth);

// 5) rutas protegidas
app.get('/users/me', getCurrentUser);
app.patch('/users/me', updateProfileValidation, updateProfile);

// 6) error logger ANTES de los handlers de error
app.use(errorLogger);

// 7) celebrate errors
app.use(errors());

// 8) tu manejador final
app.use(errorHandler);

module.exports = app;
