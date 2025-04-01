import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; 

let socket = null;

export const initializeSocket = (userId) => {
	if (socket) {
		socket.disconnect();
	}

  console.log("🔌 Connecting to socket server at", SOCKET_URL);
  socket = io(SOCKET_URL, {
    auth: { userId },
    withCredentials: true,
    transports: ["websocket", "polling"], 
    reconnection: true,
    reconnectionAttempts: 6,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
  socket.on("disconnect", () => console.warn("⚠️ Socket disconnected"));
  socket.on("connect_error", (err) =>
    console.error("❌ Socket connection error:", err)
  );
};

export const getSocket = () => {
	if (!socket) {
		throw new Error("Socket not initialized");
	}
	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};