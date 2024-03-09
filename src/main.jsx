import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ParticipantsProvider } from "./context/PptContext";
import NavHeader from "./NavHeader.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ParticipantsProvider>
    <App />
  </ParticipantsProvider>
);

/*https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code&terms=B19.2 */
