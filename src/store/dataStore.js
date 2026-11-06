import { create } from "zustand";
import api from "../api";

export const TIME_RANGES = [
  { value: "short_term", title: "4 Weeks" },
  { value: "medium_term", title: "6 Months" },
  { value: "long_term", title: "1 Year" },
];
export const DEFAULT_TIME_RANGE = "medium_term";

const VALID_RANGES = TIME_RANGES.map((range) => range.value);

const errorMessage = (error) =>
  error.response?.data?.error?.message || error.message;

// Each time range is cached in its own slot ({ items, loading, error }),
// so switching tabs never shows another range's data and never refetches.
const useUserStore = create((set, get) => ({
  user: null,
  userError: null,
  top: { tracks: {}, artists: {} },

  fetchUser: async () => {
    if (get().user) return;
    set({ userError: null });
    try {
      const response = await api.get("/me");
      set({ user: response.data });
    } catch (error) {
      set({ user: null, userError: errorMessage(error) });
    }
  },

  // type: "tracks" | "artists"
  fetchTop: async (type, timeRange = DEFAULT_TIME_RANGE) => {
    const range = VALID_RANGES.includes(timeRange)
      ? timeRange
      : DEFAULT_TIME_RANGE;
    const current = get().top[type][range];
    if (current?.loading || current?.items) return;

    const setSlot = (slot) =>
      set((state) => ({
        top: {
          ...state.top,
          [type]: { ...state.top[type], [range]: slot },
        },
      }));

    setSlot({ items: null, loading: true, error: null });
    try {
      const response = await api.get(`/me/top/${type}`, {
        params: { time_range: range, limit: 20 },
      });
      setSlot({ items: response.data.items, loading: false, error: null });
    } catch (error) {
      setSlot({ items: null, loading: false, error: errorMessage(error) });
    }
  },
}));

export default useUserStore;
