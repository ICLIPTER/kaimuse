import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import trendRoutes from "./routes/trend.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/trends", trendRoutes);

// Homepage route
app.get("/", (req, res) => {
  res.send("AI Meme Factory Backend is Running!");
});

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Meme Factory backend is running!",
    project: "AI Meme Factory",
  });
});

app.listen(PORT, () => {
  console.log(`Meme Factory running on port ${PORT}`);
});
