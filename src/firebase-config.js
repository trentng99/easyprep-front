// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSMmx4HGWhYm47dO1Qyn1NzNWclK51O8A",
  authDomain: "agile-project-83be0.firebaseapp.com",
  projectId: "agile-project-83be0",
  storageBucket: "agile-project-83be0.appspot.com",
  messagingSenderId: "575573843846",
  appId: "1:575573843846:web:6572ce86abd3d5f1b85607"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
  export const auth = getAuth(app)
  export const db = getFirestore(app)