import express from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth.route';
import cors from "cors";

const app = express();
const PORT = 5500;

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

mongoose
    .connect('mongodb+srv://burcineeren:zVYl33mxlMDLgomM@forceget.92g0b.mongodb.net/?retryWrites=true&w=majority&appName=forceget')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));