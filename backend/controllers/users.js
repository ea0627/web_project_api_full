const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

module.exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }) // por ahora aún funciona si password está select por defecto
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('AUTH_ERROR'));
            }

            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('AUTH_ERROR'));
                    }
                    const token = jwt.sign(
                        { _id: user._id },
                        process.env.NODE_ENV === 'production'
                            ? process.env.JWT_SECRET
                            : 'dev-secret',
                        { expiresIn: '7d' },
                    );

                    return res.send({ token });
                });
            })
            .catch((err) => {
                if (err.message === 'AUTH_ERROR') {
                    return res.status(401).send({ message: 'Correo o contraseña incorrectos' });
                }
                return res.status(500).send({ message: 'Error del servidor' });
            });
};

