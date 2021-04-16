export type Bed = {
  id: string;
  name: string;
  status: BedStatus;
  roomId: string;
};

export type BedStatus = "general" | "pain" | "food" | "shower" | "none";
