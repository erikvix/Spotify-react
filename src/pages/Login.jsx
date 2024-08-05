import React from "react";
import { Button } from "@/components/ui/button";
import { scopesUrlParams } from "@/lib/authScopes";

const Login = () => {
  console.log(import.meta.env.VITE_CLIENT_SECRET);
  const handleLogin = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&redirect_uri=${
      import.meta.env.VITE_AUTH_ENDPOINT
    }&scope=${scopesUrlParams}&response_type=token`;
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-4 items-center justify-center">
        <h1 className="text-5xl">Login with Spotify</h1>
        <Button onClick={() => handleLogin()}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
