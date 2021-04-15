import React from "react";
import styles from "./App.module.css";
import "./global.css";
import { Bed } from "./Bed";
import { CreateStore } from "./createStore";
import { useBeds } from "./useBeds";

export type AppProps = {
  createStore: CreateStore;
};

function App({ createStore }: AppProps) {
  const beds = useBeds(createStore);

  return (
    <div className={styles["app"]}>
      <div className={styles["beds-layout"]}>
        {beds.map((bed) => (
          <Bed key={bed.id} {...bed} />
        ))}
      </div>
    </div>
  );
}

export default App;
