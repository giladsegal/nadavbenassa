import { Bed as BedData } from "../types";
import styles from "./Bed.module.css";

export type BedProps = BedData;

const statusToEmoji: Record<BedData["status"], string> = {
  food: "🍟",
  none: "",
  shower: "🚿",
};

export function Bed({ id, name, status }: BedProps) {
  return (
    <div className={styles.root}>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>{statusToEmoji[status]}</div>
    </div>
  );
}
