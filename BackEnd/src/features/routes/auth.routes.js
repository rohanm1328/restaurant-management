import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { authMiddleware } from '../../../src/middlewares/auth.middleware.js';  
const router = express.Router(); 


// Registration API
router.post('/register', register);

// Login API
router.post('/login', login);

// Protected profile API
router.get('/profile', authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: 'You are authorized',
        user: req.user
    });

});

export default router;
