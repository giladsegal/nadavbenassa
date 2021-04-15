import React from "react";
import styles from "./Dashboard.module.css";
import { Bed } from "../components/Bed";
import { Bed as BedData } from "../types";

export type DashboardProps = {
  beds: BedData[];
};

export function Dashboard({ beds }: DashboardProps) {
  return (
    <div className={styles["beds-layout"]}>
      {beds.map((bed) => (
        <Bed key={bed.id} {...bed} />
      ))}
    </div>
  );
}
