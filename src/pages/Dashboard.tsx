import React from "react";
import styles from "./Dashboard.module.css";
import { Bed } from "../components/Bed";
import { Bed as BedData, BedStatus } from "../types";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

export type DashboardProps = {
  beds: BedData[];
  updateBedStatus: (bedId: string, status: BedStatus) => void;
};

const groupByRoom = (beds: BedData[]) => {
  const room1: BedData[] = [];
  const room2: BedData[] = [];

  beds.forEach((b) => {
    b.roomId === "1" ? room1.push(b) : room2.push(b);
  });

  return [room1, room2];
};

export function Dashboard({ beds, updateBedStatus }: DashboardProps) {
  const rooms = groupByRoom(beds);
  const { t } = useTranslation("dashboard");

  const rooms_copy = [
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[0],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
    rooms[1],
  ];

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          paddingTop: "10px",
        }}
      >
        {t("title")}
      </Typography>
      <div className={styles["beds-layout"]}>
        {rooms_copy.map((room: BedData[], idx: number) => {
          return (
            <div className={styles.room} key={idx + 1}>
              <span style={{}} className={styles["room-name"]}>
                {t("room_number", { number: idx + 1 })}
              </span>
              {room.every((b) => b.status === "none") ? (
                <div
                  style={{
                    border: "2px solid #000",
                    borderRadius: "8px",
                    gridColumn: "span 2",
                    gridRow: "span 2",
                    background: "#666",
                  }}
                ></div>
              ) : (
                room.map((bed) => (
                  <Bed
                    key={bed.id}
                    {...bed}
                    selected={bed.status !== "none"}
                    onClick={() => {
                      if (bed.status !== "none") {
                        updateBedStatus(bed.id, "none");
                      }
                    }}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
