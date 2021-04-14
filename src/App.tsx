import React from "react";
import styles from "./App.module.css";
import "./global.css";
import { Bed as BedData, DataService } from "./dataService";
import { Bed } from "./Bed";

export type AppProps = {
  dataService: DataService;
};

function App({ dataService }: AppProps) {
  const [beds, setBeds] = React.useState<BedData[]>([]);

  React.useEffect(() => {
    const fetchBeds = async function fetchBeds() {
      const _beds = await dataService.getBeds();
      setBeds(_beds);
    };

    fetchBeds();
  }, [dataService]);

  console.log(styles);

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
