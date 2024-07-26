import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto p-2">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/callback" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
