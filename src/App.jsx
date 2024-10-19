import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { storeToken } from "./api/storeToken";
import { Route, Router, Routes } from "react-router";
import Footer from "./components/footer";

function App() {
  useEffect(() => {
    storeToken();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-screen-xl mx-auto min-h-screen p-2">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
