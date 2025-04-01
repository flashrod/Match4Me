import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config({ path: path.resolve("api", ".env") });

console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("Client URL:", process.env.CLIENT_URL);

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Initialize Socket.io
initializeSocket(httpServer);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ Fix CORS: Allow frontend requests
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

// Start Server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server started at port: ${PORT}`);
  connectDB();
});
