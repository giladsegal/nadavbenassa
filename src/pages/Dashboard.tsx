import React from "react";
import styles from "./Dashboard.module.css";
import { Bed } from "../components/Bed";
import { Bed as BedData, BedStatus } from "../types";

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

  return (
    <div className={styles["beds-layout"]}>
      {rooms.map((room: BedData[], idx: number) => {
        return (
          <div className={styles.room} key={idx + 1}>
            <span style={{}} className={styles["room-name"]}>
              Room number {idx + 1}
            </span>
            {room.every((b) => b.status === "none") ? (
              <div
                style={{
                  border: "2px solid #000",
                  borderRadius: "8px",
                  gridColumn: "span 2",
                  gridRow: "span 2",
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
  );
}
