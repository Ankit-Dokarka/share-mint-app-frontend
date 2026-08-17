import { Socket, io } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      autoConnect: false,
    });

   
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    
      if (err.message === "Invalid or expired token." || err.message === "Unauthorized. Please login.") {
        disconnectSocket();
      }
    });
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};