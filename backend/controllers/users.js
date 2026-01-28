const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
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
        err.statusCode = 409;
        err.message = 'Ya existe un usuario con ese email';
      }

      // errores de validación de Mongoose
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'Datos inválidos';
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Correo o contraseña incorrectos');
        err.statusCode = 401;
        throw err;
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const err = new Error('Correo o contraseña incorrectos');
            err.statusCode = 401;
            throw err;
          }

          const token = jwt.sign(
            { _id: user._id },
            process.env.NODE_ENV === 'production'
              ? process.env.JWT_SECRET
              : 'dev-secret',
            { expiresIn: '7d' },
          );

          res.send({ token });
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error('Usuario no encontrado');
        err.statusCode = 404;
        throw err;
      }

      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        const err = new Error('Usuario no encontrado');
        err.statusCode = 404;
        throw err;
      }

      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        const err = new Error('Usuario no encontrado');
        err.statusCode = 404;
        throw err;
      }

      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};
