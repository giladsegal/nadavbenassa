import React from "react";
import styles from "./App.module.css";
import "./global.css";
import { CreateStore } from "./createStore";
import { useBeds } from "./useBeds";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Patient } from "./pages/Patient";
import { BedStatus } from "./types";

import { ThemeProvider } from "@material-ui/core/styles";

import { CssBaseline, createMuiTheme } from "@material-ui/core";

export type AppProps = {
  createStore: CreateStore;
  promptPwaInstallion: (() => Promise<boolean>) | undefined;
};

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

function App({ createStore, promptPwaInstallion }: AppProps) {
  const [beds, updateBed] = useBeds(createStore);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles["app"]}>
        <Router>
          <Switch>
            <Route
              path="/dashboard"
              render={() => {
                const updateBedStatus = (bedId: string, status: BedStatus) => {
                  updateBed?.(bedId, { status });
                };

                return (
                  <Dashboard beds={beds} updateBedStatus={updateBedStatus} />
                );
              }}
            />
            <Route
              path="/patient/:bedId"
              render={({ match }) => {
                const bedId = match.params.bedId;

                const { name, status } = beds.find((b) => b.id === bedId) || {
                  name: "",
                  status: "none",
                };

                const requestHelp = (status: BedStatus) => {
                  updateBed?.(bedId, { status });
                };

                return (
                  <Patient
                    name={name}
                    status={status}
                    onStatusChange={requestHelp}
                    promptPwaInstallation={promptPwaInstallion}
                  />
                );
              }}
            />
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
