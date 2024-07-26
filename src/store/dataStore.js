export const storeToken = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("acess_token");
  if (token) {
    localStorage.setItem("access_token", token);
    console.log(token);
  }
};

import { create } from "zustand";
import api from "../api";

const useUserStore = create((set) => ({
  user: null,
  artist: {},
  track: {},
  error: null,

  setUser: async () => {
    set((state) => ({ ...state, error: null }));

    try {
      const response = await api.get("/me");
      console.log(response.data);
      set(() => ({ user: response.data }));
    } catch (error) {
      set({ user: null, error: error.message });
      console.error(error);
    }
  },

  setTrack: async () => {
    set((state) => ({ ...state, error: null }));

    try {
      const response = await api.get("/me/top/tracks");
      console.log(response.data);
      set(() => ({ track: response.data }));
    } catch (error) {
      set({ track: null, error: error.message });
      console.error(error);
    }
  },
}));

export default useUserStore;
