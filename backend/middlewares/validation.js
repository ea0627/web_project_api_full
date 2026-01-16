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

module.exports = {
    signupValidation,
    signinValidation,
    updateProfileValidation,
};