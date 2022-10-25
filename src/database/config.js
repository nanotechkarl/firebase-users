// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNFbz3UT2pL0yxmvJ4aakSKrNjVQ9OzKw",
  authDomain: "dashboard-ef095.firebaseapp.com",
  databaseURL: "https://dashboard-ef095-default-rtdb.firebaseio.com",
  projectId: "dashboard-ef095",
  storageBucket: "dashboard-ef095.appspot.com",
  messagingSenderId: "911702714439",
  appId: "1:911702714439:web:a4349209ca326e2605a962",
  measurementId: "G-ZSM9XS2CDQ",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export { firebase };
