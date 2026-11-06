import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-screen-xl mx-auto min-h-screen p-2">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
