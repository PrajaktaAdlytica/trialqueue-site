import React from "react";
import { createRoot } from "react-dom/client";
import AppRoot from "./AppRoot.jsx";
import "./tailwind.css";
import "./styles.css";
import "./pages.css";
import "./intro.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
);
