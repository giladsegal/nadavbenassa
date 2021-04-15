import React from "react";
import { CreateStore } from "./createStore";
import { Bed } from "./types";

export function useBeds(createStore: CreateStore) {
  const [beds, setBeds] = React.useState<Bed[]>([]);

  React.useEffect(() => {
    const store = createStore();

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

    return unsubscribe;
  }, [createStore]);

  return beds;
}
