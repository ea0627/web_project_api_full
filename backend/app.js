const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');

const {
  login,
  createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('./controllers/users');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');

const cardsRouter = require('./routes/cards');

const {
  signupValidation,
  signinValidation,
  updateProfileValidation,
  updateAvatarValidation,
} = require('./middlewares/validation');

// 👇 tus loggers
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// 1) request logger ANTES de todo
app.use(requestLogger);

// 2) parseo JSON
app.use(express.json());

// 3) CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://aroundapi.mooo.com',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Preflight (OPTIONS)
app.options(/.*/, cors());

// 4) rutas públicas
app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

// 5) auth para todo lo demás
app.use(auth);

// 6) rutas protegidas
app.get('/users/me', getCurrentUser);
app.patch('/users/me', updateProfileValidation, updateProfile);
app.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

// cards
app.use('/cards', cardsRouter);

// 7) error logger ANTES de los handlers de error
app.use(errorLogger);

// 8) celebrate errors
app.use(errors());

// 9) tu manejador final
app.use(errorHandler);

module.exports = app;
