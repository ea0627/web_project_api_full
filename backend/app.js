const express = require('express');

const { login, createUser, getCurrentUser, updateProfile } = require('./controllers/users');

const auth = require('./middlewares/auth');

const app = express();

const errorHandler = require('./middlewares/error-handler');

const { errors } = require('celebrate');
const {
    signupValidation,
    signinValidation,
    updateProfileValidation,
} = require('./middlewares/validation');



app.use(express.json());

// ✅ rutas públicas de auth
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// 🔒 todo lo que sigue requiere auth
app.use(auth);

// rutas protegidas
app.get('/users/me', getCurrentUser);
app.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = app;

app.use(errors());
app.use(errorHandler);

