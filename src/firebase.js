import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSgcjJRCwWAKTUKod4jxg9FsP7d3K3umE",
  authDomain: "react-signup-66778.firebaseapp.com",
  databaseURL:
    "https://react-signup-66778-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-signup-66778",
  storageBucket: "react-signup-66778.appspot.com",
  messagingSenderId: "721007136195",
  appId: "1:721007136195:web:92165a9e23d538990c4176",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
