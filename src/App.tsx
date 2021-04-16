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

export type AppProps = {
  createStore: CreateStore;
};

function App({ createStore }: AppProps) {
  const [beds, updateBed] = useBeds(createStore);

  return (
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
  );
}

export default App;
