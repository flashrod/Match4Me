import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { initializeSocket, disconnectSocket } from "../socket/socket.client";  // Import socket functions

const CLIENT_URL = "http://localhost:5000";  // Backend URL

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  // Login Function
  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post(`${CLIENT_URL}/api/auth/login`, loginData, {
        withCredentials: true, // Ensures cookies are sent
      });
      set({ authUser: res.data.user });

      // ✅ Initialize WebSocket after successful login
      if (res.data.user && res.data.user._id) {
        initializeSocket(res.data.user._id); // Pass user ID for socket connection
      }

      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  // Logout Function
  logout: async () => {
    try {
      const res = await axiosInstance.post(`${CLIENT_URL}/api/auth/logout`, {}, { withCredentials: true });

      // Disconnect socket on logout
      disconnectSocket();

      if (res.status === 200) {
        set({ authUser: null });
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout Error:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // Check Auth Status
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get(`${CLIENT_URL}/api/auth/me`, { withCredentials: true });

      // Initialize WebSocket after successful auth check
      if (res.data.user && res.data.user._id) {
        initializeSocket(res.data.user._id); // Pass user ID for socket connection
      }

      set({ authUser: res.data.user });
    } catch (error) {
      console.error("Auth Check Error:", error.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
}));
