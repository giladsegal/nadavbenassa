import { mockBeds } from "./mockData";

export type Bed = {
  id: string;
  name: string;
  status: BedStatus;
};

export type BedStatus = "food" | "shower" | "none";

export type DataService = {
  getBeds: () => Promise<Bed[]>;
  updateBed: (payload: Pick<Bed, "id" | "status">) => Promise<void>;
};

export const createDataService = (): DataService => {
  return {
    getBeds: function getBeds() {
      return Promise.resolve(mockBeds);
    },
    updateBed: function updateBed({ id, status }) {
      return Promise.resolve().then(() => {
        mockBeds[id as any].status = status;
      });
    },
  };
};
