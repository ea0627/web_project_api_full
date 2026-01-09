const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
    const {
        name,
        about,
        avatar,
        email,
        password,
    } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
        }))
        .then((user) => res.status(201).send({
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
        }))
    .catch((err) => {
      // email duplicado (Mongo)
        if (err.code === 11000) {
            return res.status(409).send({ message: 'Ya existe un usuario con ese email' });
        }

      // errores de validación de Mongoose
        if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Datos inválidos' });
        }

        return res.status(500).send({ message: 'Error del servidor' });
    });
};
