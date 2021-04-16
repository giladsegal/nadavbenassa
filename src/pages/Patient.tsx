import React from "react";
import { BedStatus } from "../types";
import styles from "./Patient.module.css";
import { Emoji } from "../components/Emoji";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <FormControl style={{ minWidth: "150px", marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-label">Choose language</InputLabel>
          <Select value="English">
            <MenuItem value={"Hebrew"}>Hebrew</MenuItem>
            <MenuItem value={"English"}>English</MenuItem>
            <MenuItem value={"Russian"}>Russian</MenuItem>
            <MenuItem value={"Arabic"}>Arabic</MenuItem>
          </Select>
        </FormControl>
        <Button href="#text-buttons" color="primary">
          Logout
        </Button>
      </div>
      <div className={styles["requests-layout"]}>
        <Button
          variant="contained"
          className={`${styles.request} ${
            status === "food" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("food")}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Emoji status="food" className={styles["status-image"]} />
            <div className={styles["status-description"]}>Hungry</div>
          </div>
        </Button>
        <Button
          variant="contained"
          className={`${styles.request} ${
            status === "shower" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("shower")}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Emoji status="shower" className={styles["status-image"]} />
            <div className={styles["status-description"]}>Toilet</div>
          </div>
        </Button>
        <Button
          variant="contained"
          className={`${styles.request} ${
            status === "general" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("general")}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Emoji status="general" className={styles["status-image"]} />
            <div className={styles["status-description"]}>General</div>
          </div>
        </Button>
        <Button
          variant="contained"
          className={`${styles.request} ${
            status === "pain" ? styles["request-selected"] : ""
          }`}
          onClick={createStatusClickHandler("pain")}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Emoji status="pain" className={styles["status-image"]} />
            <div className={styles["status-description"]}>Pain</div>
          </div>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={createStatusClickHandler("none")}
        >
          Cancel Request
        </Button>
      </div>
      {status !== "none" && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            padding: "20px",
            borderTop: "1px solid black",
          }}
        >
          <Typography variant="h5">Request sent to staff</Typography>
        </div>
      )}
    </div>
  );
}
