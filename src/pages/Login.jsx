import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { isLoggedIn, redirectToSpotifyLogin } from "@/lib/auth";

const Login = () => {
  const { search } = useLocation();
  const [error, setError] = useState(null);

  // If the redirect URI points at "/", hand the code over to /home.
  const params = new URLSearchParams(search);
  if (params.has("code") || params.has("error")) {
    return <Navigate to={`/home${search}`} replace />;
  }
  if (isLoggedIn()) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = () => {
    redirectToSpotifyLogin().catch((err) => setError(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl sm:text-5xl">Login with Spotify</h1>
        <Button onClick={handleLogin}>Login</Button>
        {error && <p className="text-destructive">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
