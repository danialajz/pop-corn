import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRainting from "./StarRainting.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRainting maxRaiting={5} /> */}
    {/* <StarRainting maxRaiting={10}color="red" size={32}/> */}
  </StrictMode>
);
