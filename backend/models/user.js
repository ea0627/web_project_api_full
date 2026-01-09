const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        // (en este punto aún puede estar required o no, eso se cambia en el punto 2)
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    avatar: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Email inválido',
        },
    },

    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', userSchema);
