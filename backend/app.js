const express = require('express');

const { login, createUser, getCurrentUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.json());

// ✅ rutas públicas de auth
app.post('/signin', login);
app.post('/signup', createUser);

// 🔒 todo lo que sigue requiere auth
app.use(auth);

// rutas protegidas
app.get('/users/me', getCurrentUser);

module.exports = app;
