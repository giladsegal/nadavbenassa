import React from "react";
import { BedStatus } from "../types";

export type PatientProps = {
  requestHelp: (status: BedStatus) => void;
};

export function Patient({ requestHelp }: PatientProps) {
  return (
    <div>
      <div onClick={() => requestHelp("food")}>food</div>
      <div onClick={() => requestHelp("shower")}>shower</div>
    </div>
  );
}
