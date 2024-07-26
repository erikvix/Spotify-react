export const storeToken = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1)); // Remove o '#' inicial
  const token = params.get("access_token");
  if (token) {
    localStorage.setItem("access_token", token);
  }
};
