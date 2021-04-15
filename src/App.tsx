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
              return <Dashboard beds={beds} />;
            }}
          />
          <Route
            path="/patient/:bedId"
            render={({ match }) => {
              const bedId = match.params.bedId;

              const { name } = beds.find((b) => b.id === bedId) || { name: "" };

              const requestHelp = (status: BedStatus) => {
                updateBed?.(bedId, { status });
              };

              return <Patient requestHelp={requestHelp} name={name} />;
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
