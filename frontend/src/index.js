import React from "react";
import { createRoot } from "react-dom/client"; // Menggunakan createRoot dari react-dom/client
import App from "./App";
import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.min.css";

// Menggunakan createRoot di React 18
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
