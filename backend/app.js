const express = require('express');

const { login, createUser } = require('./controllers/users');

const app = express();

app.use(express.json());

// ruta de prueba
app.get('/health', (req, res) => {
    res.send({ ok: true });
});

// ✅ rutas públicas de auth
app.post('/signin', login);
app.post('/signup', createUser);

module.exports = app;
