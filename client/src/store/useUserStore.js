import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
	loading: false,

	updateProfile: async (data) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.put("/users/update", data);
			useAuthStore.getState().setAuthUser(res.data.user);
			toast.success("Profile updated successfully");
		} catch (error) {
			console.error('Error updating profile:', error);
			if (error.response) {
				console.error('Response data:', error.response.data);
				console.error('Response status:', error.response.status);
				console.error('Response headers:', error.response.headers);
				toast.error(error.response.data.message || "Something went wrong");
			} else if (error.request) {
				console.error('Request data:', error.request);
				toast.error("No response received from server");
			} else {
				console.error('Error message:', error.message);
				toast.error("An unexpected error occurred");
			}
		} finally {
			set({ loading: false });
		}
	},
}));
