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
      onAdd: (bed) => {
        setBeds((prevBeds) => {
          return [...prevBeds, bed];
        });
      },
      onModify: (bed: Bed) => {
        setBeds((prevBeds) => {
          const bedToReplaceIdx = prevBeds.findIndex((b) => b.id === bed.id);
          const newBeds = [...prevBeds];
          newBeds.splice(bedToReplaceIdx, 1, bed);
          return newBeds;
        });
      },
      onDelete: (bed: Bed) => {
        setBeds((prevBeds) => {
          const bedToReplaceIdx = prevBeds.findIndex((b) => b.id === bed.id);
          const newBeds = [...prevBeds];
          newBeds.splice(bedToReplaceIdx, 1);
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
