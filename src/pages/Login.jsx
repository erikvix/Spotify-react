import React from "react";
import { SCOPES_URL_PARAM } from "../auth/index";
import { Button } from "@/components/ui/button";

const Login = () => {
  const handleLogin = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token`;
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
