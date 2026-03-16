// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSeu1Y_GcTHIagtQL8UWVLvPTCfUoLy8E",
  authDomain: "wedding-prototype-aa098.firebaseapp.com",
  projectId: "wedding-prototype-aa098",
  storageBucket: "wedding-prototype-aa098.firebasestorage.app",
  messagingSenderId: "876766970256",
  appId: "1:876766970256:web:95adc5066a171e78853315",
  measurementId: "G-Y4Q88QGD6Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
