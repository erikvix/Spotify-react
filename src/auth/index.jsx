export const CLIENT_ID = "13541e997e144450a6b9039c428b394d";
export const CLIENT_SECRET = "8099ecccd74c41d4989f32341f29be69";
export const AUTH_ENDPOINT = "https://semaninha.netlify.app/home";
// export const AUTH_ENDPOINT = "http://localhost:5173/";
export const URL_AFTER_LOGIN = "https://chartfy.netlify.app/home";
export const SPACE_DELIMITER = "%20";
export const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-position",
];
export const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
