const spaceDelimiter = "%20";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
];

export const scopesUrlParams = scopes.join(spaceDelimiter);
