import { Bed as BedData } from "../types";
import styles from "./Bed.module.css";
import { Emoji } from "./Emoji";

export type BedProps = BedData;

export function Bed({ name, status }: BedProps) {
  return (
    <div className={styles.root}>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>
        <Emoji status={status} />
      </div>
    </div>
  );
}
