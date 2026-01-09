const express = require('express');

const app = express();

app.use(express.json());

// ruta de prueba
app.get('/health', (req, res) => {
    res.send({ ok: true });
});

module.exports = app;
