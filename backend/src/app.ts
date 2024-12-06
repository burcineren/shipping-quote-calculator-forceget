import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import offerRoutes from "./routes/offer.route";

const app: Application = express();
const PORT: number = 5500;

// CORS Options
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/offers", offerRoutes); // Offer management routes

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://burcineeren:zVYl33mxlMDLgomM@forceget.92g0b.mongodb.net/forceget?retryWrites=true&w=majority&appName=forceget"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;