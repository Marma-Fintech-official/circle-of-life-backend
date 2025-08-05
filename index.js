import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import router from "./src/routes/allRoutes.js";
dotenv.config();
import morgan from "morgan";

// Create Express app
const app = express();
app.use(morgan("combined"));

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
await connectDB();

// Set up routes
app.use(router);

// Example test route
app.get("/", (req, res) => {
  res.send("🌍 Welcome to Circle of Life Backend 🚀🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is runningsss 🔥🔥`);
});
