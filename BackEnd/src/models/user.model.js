const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    role: {
        type: String,
        required: true,
        enum: ['Chef', 'Manager', 'Waiter', 'Counter']
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);