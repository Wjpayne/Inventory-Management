import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemsRouter from "./routes/items.js";


const app = express();
const mongoUri = process.env.REACT_APP_MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/items", itemsRouter);

// MongoDB connection
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(process.env.PORT, () => console.log("🚀 Server running on http://localhost:4000"));