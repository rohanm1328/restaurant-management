const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../../../src/middlewares/auth.middleware');

// Registration API
router.post('/register', authController.register);

// Login API
router.post('/login', authController.login);

// Protected profile API
router.get('/profile', authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: 'You are authorized',
        user: req.user
    });

});

module.exports = router;