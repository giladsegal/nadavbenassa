import React from "react";
import { CreateStore } from "./createStore";
import { Bed } from "./types";

export type UpdateBed = (
  id: string,
  payload: Partial<Omit<Bed, "id">>
) => Promise<void>;

export function useBeds(
  createStore: CreateStore
): [Bed[], UpdateBed | undefined] {
  const [beds, setBeds] = React.useState<Bed[]>([]);
  const updateBed = React.useRef<UpdateBed>();

  React.useEffect(() => {
    const store = createStore();
    updateBed.current = (id: string, payload: Partial<Omit<Bed, "id">>) => {
      return store.update("beds", id, payload);
    };

    const { unsubscribe } = store.subscribe<Bed>("beds", {
      onAdd: (beds) => {
        setBeds((prevBeds) => {
          return [...prevBeds, ...beds];
        });
      },
      onModify: (beds) => {
        setBeds((prevBeds) => {
          const newBeds = [...prevBeds];
          beds.forEach((bed) => {
            const bedToReplaceIdx = prevBeds.findIndex((b) => b.id === bed.id);
            newBeds.splice(bedToReplaceIdx, 1, bed);
          });
          return newBeds;
        });
      },
      onDelete: (beds) => {
        setBeds((prevBeds) => {
          const newBeds = [...prevBeds];
          beds.forEach((bed) => {
            const bedToReplaceIdx = prevBeds.findIndex((b) => b.id === bed.id);
            newBeds.splice(bedToReplaceIdx, 1);
          });
          return newBeds;
        });
      },
      onError: (e) => console.log(e),
    });

    return () => {
      unsubscribe();
      updateBed.current = undefined;
    };
  }, [createStore]);

  return [beds, updateBed.current];
}
