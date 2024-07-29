import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { storeToken } from "./api/storeToken";

function App() {
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    storeToken();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-2">
      {token ? <Home /> : <Login />}
    </div>
  );
}

export default App;
