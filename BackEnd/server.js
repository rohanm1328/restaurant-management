import router from './src/features/routes/auth.routes.js';
import connectDB from './src/config/database.js';
import authRoutes from './src/features/routes/auth.routes.js';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';


dotenv.config();


const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

// Test API
app.get('/', (req, res) => {
    res.send('RestroManage Backend is Running Successfully!');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Start server after connecting to database
const startServer = async () => {

    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();