const firebase = require("firebase/app");
require("firebase/firestore");

(async function main() {
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
  // Get a new write batch
  const batch = db.batch();

  for (let roomIdx = 1; roomIdx <= 25; roomIdx++) {
    for (let bedIdx = 1; bedIdx <= 4; bedIdx++) {
      const aBed = db.collection("beds").doc();
      batch.set(aBed, {
        roomId: roomIdx,
        status: "none",
        name: `Bed ${bedIdx}`,
        order: bedIdx,
      });
    }
  }

  // Commit the batch
  await batch.commit();
})();
