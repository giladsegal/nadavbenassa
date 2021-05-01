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
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

i18next.init({
  interpolation: { escapeValue: false },
  lng: "he",
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

serviceWorkerRegistration.register();

let pwaInstallCallback: (() => Promise<boolean>) | undefined = undefined;

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();

    pwaInstallCallback = () => {
      e.prompt();
      return e.userChoice.then(({ outcome }) => {
        return outcome === "accepted";
      });
    };
  });
}

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App createStore={createStore} promptPwaInstallion={pwaInstallCallback} />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
