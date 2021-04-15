import React from "react";
import { BedStatus } from "../types";
import styles from "./Patient.module.css";
import { Emoji } from "../components/Emoji";

export type PatientProps = {
  name: string;
  requestHelp: (status: BedStatus) => void;
};

export function Patient({ name, requestHelp }: PatientProps) {
  return (
    <div>
      <div style={{ fontSize: "30px", textAlign: "center" }}>{name}</div>
      <div className={styles["requests-layout"]}>
        <button className={styles.request} onClick={() => requestHelp("food")}>
          <Emoji status="food" />
        </button>
        <button
          className={styles.request}
          onClick={() => requestHelp("shower")}
        >
          <Emoji status="shower" />
        </button>
      </div>
    </div>
  );
}
