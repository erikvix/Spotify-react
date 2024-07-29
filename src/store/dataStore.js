export const storeToken = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("access_token");
  if (token) {
    localStorage.setItem("access_token", token);
    console.log(token);
  }
};

const getTimeRange = (time_range) => {
  if (time_range === "short_term") {
    return "?time_range=short_term";
  } else if (time_range === "long_term") {
    return "?time_range=long_term";
  } else {
    return "?time_range=medium_term";
  }
};

import { create } from "zustand";
import api from "../api";

const useUserStore = create((set) => ({
  user: null,
  tracks: {},
  artists: {},
  genres: {},
  error: null,

  setUser: async () => {
    set((state) => ({ ...state, error: null }));

    try {
      const response = await api.get("/me");
      set(() => ({ user: response.data }));
    } catch (error) {
      set({ user: null, error: error.message });
      console.error(error);
    }
  },

  setTracks: async (time_range) => {
    set({ error: null });

    try {
      const response = await api.get(
        `/me/top/tracks${getTimeRange(time_range)}`
      );
      set({ tracks: response.data });
    } catch (error) {
      set({ tracks: null, error: error.message });
      console.error(error);
    }
  },

  setArtists: async (time_range) => {
    set({ error: null });

    try {
      const response = await api.get(
        `/me/top/artists${getTimeRange(time_range)}`
      );
      set({ artists: response.data });
    } catch (error) {
      set({ artists: null, error: error.message });
      console.error(error);
    }
  },

  setGenres: async (time_range) => {
    set({ error: null });

    try {
      const response = await api.get(
        `/me/top/genres${getTimeRange(time_range)}`
      );
      set({ genres: response.data });
    } catch (error) {
      set({ genres: null, error: error.message });
      console.error(error);
    }
  },
}));

export default useUserStore;
