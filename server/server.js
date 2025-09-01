import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemsRouter from "./routes/items.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/items", itemsRouter);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/coffee_inventory")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.listen(4000, () => console.log("🚀 Server running on http://localhost:4000"));