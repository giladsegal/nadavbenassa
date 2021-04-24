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
  const grouped = beds.reduce<BedData[][]>((agg, curr) => {
    const roomIdx = curr.roomId - 1;
    agg[roomIdx] = agg[roomIdx] || [];
    agg[roomIdx].push(curr);

    return agg;
  }, []);

  grouped.forEach((room) => {
    room.sort((b1, b2) => b1.order - b2.order);
  });

  return grouped;
};

export function Dashboard({ beds, updateBedStatus }: DashboardProps) {
  const rooms = React.useMemo(() => {
    return groupByRoom(beds);
  }, [beds]);

  const { t } = useTranslation("dashboard");

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
        {rooms.map((room: BedData[], idx: number) => {
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
