import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { storeToken } from "./api/storeToken";

function App() {
  const [url, setUrl] = useState(() => window.location.href);
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    if (url.includes("access_token")) {
      storeToken();
    }
  }, [url]);

  return (
    <div className="max-w-screen-xl mx-auto p-2">
      {token ? <Home /> : <Login />}
    </div>
  );
}

export default App;
