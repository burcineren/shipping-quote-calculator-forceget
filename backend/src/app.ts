import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import offerRoutes from "./routes/offer.route";
import dimensionsRoutes from "./routes/dimensions.route";
import dotenv from "dotenv"

dotenv.config({path: './backend/.env'});
const app: Application = express();
const PORT: number = parseInt(process.env.PORT ?? '5500');

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
app.use("/api/dimensions", dimensionsRoutes); 
app.use("/api/offers", offerRoutes); // Offer management routes
// MongoDB Connection
var db:string = process.env.MONGODB_SECRET ?? ''
mongoose
  .connect(
    db
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;