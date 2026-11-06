import axios from "axios";
import { getValidAccessToken, logout, refreshAccessToken } from "@/lib/auth";

const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

api.interceptors.request.use(async (config) => {
  const token = await getValidAccessToken().catch(() => null);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, refresh once and retry; if that fails the session is gone.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && original && !original._retried) {
      original._retried = true;
      try {
        const token = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
