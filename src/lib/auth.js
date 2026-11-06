// Spotify OAuth 2.0 — Authorization Code with PKCE.
// The implicit grant (response_type=token) was removed by Spotify, and PKCE
// works without a backend and without a client secret.
import { scopes } from "./authScopes";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const REDIRECT_URI =
  import.meta.env.VITE_REDIRECT_URI ||
  import.meta.env.VITE_AUTH_ENDPOINT ||
  `${window.location.origin}/home`;

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const KEYS = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  expiresAt: "expires_at",
  verifier: "pkce_code_verifier",
  state: "pkce_state",
};

// Refresh a minute early so a request never goes out with an expiring token.
const EXPIRY_MARGIN_MS = 60 * 1000;

const randomString = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => chars[v % chars.length]).join("");
};

const base64UrlEncode = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const sha256 = (text) =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));

const saveTokens = ({ access_token, refresh_token, expires_in }) => {
  localStorage.setItem(KEYS.accessToken, access_token);
  // Spotify may omit refresh_token on refresh; keep the previous one then.
  if (refresh_token) localStorage.setItem(KEYS.refreshToken, refresh_token);
  localStorage.setItem(
    KEYS.expiresAt,
    String(Date.now() + expires_in * 1000)
  );
};

export const clearTokens = () => {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
};

export const isLoggedIn = () =>
  Boolean(
    localStorage.getItem(KEYS.accessToken) ||
      localStorage.getItem(KEYS.refreshToken)
  );

export const redirectToSpotifyLogin = async () => {
  const verifier = randomString(64);
  const state = randomString(16);
  localStorage.setItem(KEYS.verifier, verifier);
  localStorage.setItem(KEYS.state, state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: scopes.join(" "),
    code_challenge_method: "S256",
    code_challenge: base64UrlEncode(await sha256(verifier)),
    state,
  });

  window.location.assign(`${AUTHORIZE_URL}?${params}`);
};

const requestToken = async (body) => {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: CLIENT_ID, ...body }),
  });
  if (!response.ok) {
    throw new Error(`Spotify token request failed (${response.status})`);
  }
  const data = await response.json();
  saveTokens(data);
  return data.access_token;
};

// Exchanges ?code= from the redirect for tokens, then strips the query
// string so the code never stays in the address bar or history.
// Shared promise: React StrictMode runs effects twice, and a code is single-use.
let callbackPromise = null;
export const handleAuthCallback = () => {
  if (callbackPromise) return callbackPromise;

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");
  if (!code && !error) return Promise.resolve();

  const cleanUrl = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

  callbackPromise = (async () => {
    try {
      if (error) throw new Error(`Spotify login cancelled: ${error}`);

      const expectedState = localStorage.getItem(KEYS.state);
      const verifier = localStorage.getItem(KEYS.verifier);
      if (!verifier || params.get("state") !== expectedState) {
        throw new Error("Invalid login state, please try again.");
      }

      await requestToken({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      });
    } finally {
      localStorage.removeItem(KEYS.verifier);
      localStorage.removeItem(KEYS.state);
      cleanUrl();
    }
  })();

  return callbackPromise;
};

// Concurrent requests share a single refresh call.
let refreshPromise = null;
export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem(KEYS.refreshToken);
  if (!refreshToken) return Promise.reject(new Error("No refresh token"));

  if (!refreshPromise) {
    refreshPromise = requestToken({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

// Returns a valid access token, refreshing it first if it has expired.
export const getValidAccessToken = async () => {
  const token = localStorage.getItem(KEYS.accessToken);
  const expiresAt = Number(localStorage.getItem(KEYS.expiresAt) || 0);
  if (token && Date.now() < expiresAt - EXPIRY_MARGIN_MS) return token;
  if (localStorage.getItem(KEYS.refreshToken)) return refreshAccessToken();
  return null;
};

export const logout = () => {
  clearTokens();
  window.location.assign("/");
};
