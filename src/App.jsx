import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { storeToken } from "./api/storeToken";
import { Route, Router, Routes } from "react-router";

function App() {
  useEffect(() => {
    storeToken();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-2">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
