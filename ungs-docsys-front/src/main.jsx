import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/index.css";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard/dashboard";
import SetNewPass from "./pages/Auth/login/setnewpass.jsx";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setnewpass" element={<SetNewPass />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </StrictMode>
);
