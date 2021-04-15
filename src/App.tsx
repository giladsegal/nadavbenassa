import React from "react";
import styles from "./App.module.css";
import "./global.css";
import { Bed } from "./Bed";
import { CreateStore } from "./createStore";
import { Bed as BedData } from "./types";

export type AppProps = {
  createStore: CreateStore;
};

function App({ createStore }: AppProps) {
  const [beds, setBeds] = React.useState<BedData[]>([]);

  React.useEffect(() => {
    const store = createStore();

    store.subscribe<BedData>("beds", {
      onAdd: (bed) => {
        setBeds((prevBeds) => {
          return [...prevBeds, bed];
        });
      },
      onError: (e) => console.log(e),
    });
  }, [createStore]);

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
