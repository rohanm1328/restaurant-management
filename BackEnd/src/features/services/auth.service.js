import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (userId, rememberMe = false) => {

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        {
            expiresIn: rememberMe ? '7d' : '1d'
        }
    );
};

// Register User
export const registerUser = async (userData) => {

    const { name, email, phone, role, password } = userData;

    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    if (existingUser) {
        throw new Error('Email is already registered');
    }

    
    if (userData.role === 'Manager') {
        
        const existingManager = await User.findOne({
            role: 'Manager'
        });
        
        if (existingManager) {
            throw new Error(
                'Manager already exists. You cannot register as Manager.'
            );
        }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        role,
        password: hashedPassword,
        status: userData.role === 'Manager'
            ? 'approved'
            : 'pending'
    });

    return user;
};

// Login User
export const loginUser = async (email, password, rememberMe) => {

    const user = await User.findOne({
        email: email.toLowerCase()
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (user.status === 'pending') {
    throw new Error('Your account is waiting for manager approval');
    }

    if (user.status === 'rejected') {
    throw new Error('Your registration has been rejected');
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id, rememberMe);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status
        }
    };
};

