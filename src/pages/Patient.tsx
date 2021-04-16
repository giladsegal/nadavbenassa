import React from "react";
import { BedStatus } from "../types";
import styles from "./Patient.module.css";
import { Emoji } from "../components/Emoji";

export type PatientProps = {
  name: string;
  status: BedStatus;
  onStatusChange: (status: BedStatus) => void;
};

export function Patient({ name, onStatusChange, status }: PatientProps) {
  const createStatusClickHandler = (statusToUpdate: BedStatus) => () => {
    if (status === statusToUpdate) {
      onStatusChange("none");
    } else {
      onStatusChange(statusToUpdate);
    }
  };

  return (
    <div>
      {window.location.hostname === "localhost" && (
        <div style={{ fontSize: "30px", textAlign: "center" }}>{name}</div>
      )}
      <label>
        Choose language:
        <select defaultValue="English">
          <option>Hebrew</option>
          <option>English</option>
          <option>Arabic</option>
          <option>Russian</option>
        </select>
      </label>

      <div className={styles["requests-layout"]}>
        <button
          className={`${styles.request} ${
            status === "food" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("food")}
        >
          <Emoji status="food" />
          <div style={{ fontSize: "20px" }}>I'm hungry</div>
        </button>
        <button
          className={`${styles.request} ${
            status === "shower" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("shower")}
        >
          <Emoji status="shower" />
          <div style={{ fontSize: "20px" }}>Toilet</div>
        </button>
        <button
          className={`${styles.request} ${
            status === "general" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("general")}
        >
          <Emoji status="general" />
          <div style={{ fontSize: "20px" }}>General</div>
        </button>
        <button
          className={`${styles.request} ${
            status === "pain" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("pain")}
        >
          <Emoji status="pain" />
          <div style={{ fontSize: "20px" }}>I'm in pain</div>
        </button>
      </div>
      {status !== "none" && (
        <div style={{ fontSize: "20px" }}>
          Your request was sent to the staff
        </div>
      )}
      <button>logout</button>
      <button onClick={createStatusClickHandler("none")}>cancel request</button>
    </div>
  );
}
