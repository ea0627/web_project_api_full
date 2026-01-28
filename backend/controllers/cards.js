const Card = require('../models/card');

// Obtener todas las tarjetas
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

// Crear tarjeta
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos inválidos al crear la tarjeta' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// Eliminar tarjeta
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'No puedes borrar tarjetas de otro usuario' });
      }
      return card.deleteOne().then(() => res.send({ message: 'Tarjeta eliminada' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};


// Dar like
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};

// Quitar like
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Tarjeta no encontrada' });
      }
      return res.status(500).send({ message: 'Error del servidor' });
    });
};
