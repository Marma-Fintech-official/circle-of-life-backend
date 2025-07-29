
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
await connectDB();

// Example test route
app.get('/', (req, res) => {
  res.send('🌍 Welcome to Circle of Life Backend 🚀🚀');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running 🔥🔥`);
});
