// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlashMessageProvider>
      <App />
    </FlashMessageProvider>
  </React.StrictMode>
);
