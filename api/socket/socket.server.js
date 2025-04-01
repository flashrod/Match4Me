import { Server } from "socket.io";

let io;
const connectedUsers = new Map();

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
    transports: ["websocket", "polling"], // Ensures WebSocket transport
  });

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return next(new Error("Invalid user ID"));

    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`✅ User connected with socket id: ${socket.id}`);
    connectedUsers.set(socket.userId, socket.id);

    socket.on("disconnect", () => {
      console.log(`⚠️ User disconnected: ${socket.id}`);
      connectedUsers.delete(socket.userId);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const getConnectedUsers = () => connectedUsers;
