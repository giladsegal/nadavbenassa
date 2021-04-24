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
import { useTranslation } from "react-i18next";

export type PatientProps = {
  name: string;
  status: BedStatus;
  onStatusChange: (status: BedStatus) => void;
};

export function Patient({ name, onStatusChange, status }: PatientProps) {
  const { t, i18n } = useTranslation("patient");
  const [language, setLanguage] = React.useState("en");

  const onLanguageChange = (ev: any) => {
    const lang = ev.target.value;

    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

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
        <div style={{ fontSize: "30px", textAlign: "center" }}>
          {t("bed_name", { number: name.split(" ")[1] })}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <FormControl style={{ minWidth: "150px", marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-label">
            {t("choose_language")}
          </InputLabel>
          <Select value={language} onChange={onLanguageChange}>
            <MenuItem value={"he"}>{t("languages.he")}</MenuItem>
            <MenuItem value={"en"}>{t("languages.en")}</MenuItem>
            <MenuItem value={"ru"}>{t("languages.ru")}</MenuItem>
            <MenuItem value={"ar"}>{t("languages.ar")}</MenuItem>
          </Select>
        </FormControl>
        <Button href="#text-buttons" color="primary">
          {t("logout")}
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
            <div className={styles["status-description"]}>
              {t("status.hungry")}
            </div>
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
            <div className={styles["status-description"]}>
              {t("status.toilet")}
            </div>
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
            <div className={styles["status-description"]}>
              {t("status.general")}
            </div>
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
            <div className={styles["status-description"]}>
              {t("status.pain")}
            </div>
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
          {t("cancel_request")}
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
          <Typography variant="h5">{t("request_status.sent")}</Typography>
        </div>
      )}
    </div>
  );
}
