const spaceDelimiter = "%20";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-position",
];

export const scopesUrlParams = scopes.join(spaceDelimiter);
