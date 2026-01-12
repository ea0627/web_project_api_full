const express = require('express');

const { login, createUser, getCurrentUser } = require('./controllers/users');
const auth = require('./middlewares/auth');


const app = express();

app.use(express.json());

// ruta de prueba
app.get('/health', (req, res) => {
    res.send({ ok: true });
});

// ✅ rutas públicas de auth
app.post('/signin', login);
app.post('/signup', createUser);

app.get('/users/me', auth, getCurrentUser);

module.exports = app;
