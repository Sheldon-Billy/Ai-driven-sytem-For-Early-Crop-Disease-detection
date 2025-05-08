import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Globalcontext } from "./hooks/Globalcontext.jsx";

createRoot(document.getElementById("root")).render(
  <Globalcontext>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Globalcontext>
);
