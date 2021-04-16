import { Bed as BedData } from "../types";
import styles from "./Bed.module.css";
import { Emoji } from "./Emoji";

export type BedProps = BedData & {
  selected?: boolean;
  onClick?: () => void;
};

export function Bed({ name, status, selected, onClick }: BedProps) {
  return (
    <div
      className={`${styles.root} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.name}>{name.split(" ")[1]}</div>
      <div className={styles.status}>
        <Emoji status={status} />
      </div>
    </div>
  );
}
