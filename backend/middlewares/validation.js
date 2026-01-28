const { celebrate, Joi, Segments } = require('celebrate');
const { validateUrl } = require('../utils/validateUrl');

const signupValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateUrl),
    }),
});

const signinValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

const updateProfileValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
    }),
});

const updateAvatarValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        avatar: Joi.string().required().custom(validateUrl),
    }),
});

const cardIdValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        cardId: Joi.string().hex().length(24).required(),
    }),
});

const createCardValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2).max(30).required(),
        link: Joi.string().custom(validateUrl).required(),
    }),
});

module.exports = {
    signupValidation,
    signinValidation,
    updateProfileValidation,
    updateAvatarValidation,
    cardIdValidation,
    createCardValidation,
};