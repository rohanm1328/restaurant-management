const authService = require('../services/auth.service');

// REGISTER
const register = async (req, res) => {

    try {

        const { name, email, phone, role, password } = req.body;

        if (!name || !email || !phone || !role || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email'
            });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must contain 10 digits'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least 6 characters'
            });
        }

        const user = await authService.registerUser({
            name,
            email,
            phone,
            role,
            password
        });

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {

        return res.status(
            error.message === 'Email is already registered' ? 409 : 500
        ).json({
            success: false,
            message: error.message
        });
    }
};

// LOGIN
const login = async (req, res) => {

    try {

        const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const result = await authService.loginUser(
            email,
            password,
            rememberMe
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: result.token,
            user: result.user
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};