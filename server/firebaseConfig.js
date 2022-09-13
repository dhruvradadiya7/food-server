const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBzMc_gNnTPJ7pGQ4Jxs7yt6t571G49MFY",
  authDomain: "foodlab-test.firebaseapp.com",
  projectId: "foodlab-test",
  storageBucket: "foodlab-test.appspot.com",
  messagingSenderId: "982835471182",
  appId: "1:982835471182:web:5a8e831b04abf2ca4bf41f"
};

const app = initializeApp(firebaseConfig);

module.exports = app;
const database = getDatabase(app);
