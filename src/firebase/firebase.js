// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3MGhK240llwoFRiK8nT1B20ZK71_XzaY",
  authDomain: "ferrante-8178d.firebaseapp.com",
  projectId: "ferrante-8178d",
  storageBucket: "ferrante-8178d.appspot.com",
  messagingSenderId: "373221558355",
  appId: "1:373221558355:web:4ffd094b40a12dab555ea6",
  measurementId: "G-C2H40Q4ERD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 const auth = getAuth(app)
 const db = getFirestore(app);
export { auth, db };