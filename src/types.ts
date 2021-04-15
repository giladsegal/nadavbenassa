export type Bed = {
  id: string;
  name: string;
  status: BedStatus;
};

export type BedStatus = "food" | "shower" | "none";
