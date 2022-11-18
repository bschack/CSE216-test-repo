import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAGUhHYRLc66zb3Br-MlTytDO6rTOBv918",
  authDomain: "CSE216-BLEND.firebaseapp.com",
  databaseURL: "https://cse216-blend-default-rtdb.firebaseio.com/",
  storageBucket: "gs://cse216-blend.appspot.com",
  messagingSenderId: "100477919031614500585"
};
const app = initializeApp(config);

// Firebase storage reference
const storage = getStorage(app);
export default storage;
