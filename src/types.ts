export type Bed = {
  id: string;
  name: string;
  status: BedStatus;
  roomId: number;
  order: number;
};

export type BedStatus = "general" | "pain" | "food" | "shower" | "none";
