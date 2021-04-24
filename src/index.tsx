import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "./createStore";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import patient_en from "./translations/en/patient.json";
import dashboard_en from "./translations/en/dashboard.json";
import patient_he from "./translations/he/patient.json";
import dashboard_he from "./translations/he/dashboard.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      dashboard: dashboard_en,
      patient: patient_en,
    },
    he: {
      dashboard: dashboard_he,
      patient: patient_he,
    },
  },
});

i18next.on("languageChanged", function (lng) {
  document.dir = lng === "he" ? "rtl" : "ltr";
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App createStore={createStore} />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
