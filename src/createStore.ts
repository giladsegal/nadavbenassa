import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqvGMVzCWSuS41DwHbPJEsF2o0LK8FC4I",
  authDomain: "bedbuzz-10d7f.firebaseapp.com",
  projectId: "bedbuzz-10d7f",
  storageBucket: "bedbuzz-10d7f.appspot.com",
  messagingSenderId: "841102971377",
  appId: "1:841102971377:web:5e44b5e93423703e15b450",
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export type CreateStore = () => {
  subscribe: <T>(
    collection: string,
    handlers: Partial<StoreHandlers<T>>
  ) => {
    unsubscribe: StoreCleanup;
  };
};

export type StoreError = firebase.firestore.FirestoreError;

export type StoreHandlers<T extends {}> = {
  onAdd: (entity: T) => void;
  onModify: (entity: T) => void;
  onDelete: (entity: T) => void;
  onError: (error: StoreError) => void;
};

export type StoreCleanup = () => void;

export const createStore: CreateStore = () => {
  return {
    subscribe: (collection, { onAdd, onModify, onDelete, onError }) => {
      const unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = { id: change.doc.id, ...change.doc.data() } as any;
          if (change.type === "added") {
            onAdd?.(data);
          }
          if (change.type === "modified") {
            onModify?.(data);
          }
          if (change.type === "removed") {
            onDelete?.(data);
          }
        });
      }, onError);

      return { unsubscribe };
    },
  };
};
