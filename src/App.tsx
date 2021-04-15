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

export type AppProps = {
  createStore: CreateStore;
};

function App({ createStore }: AppProps) {
  const beds = useBeds(createStore);

  return (
    <div className={styles["app"]}>
      <Router>
        <Switch>
          <Route
            path="/dashboard"
            render={() => {
              return <Dashboard beds={beds} />;
            }}
          ></Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
