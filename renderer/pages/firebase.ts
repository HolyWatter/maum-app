import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj55uz70Ct7gaVgxCeBXBCAPoJBh2-F_s",
  authDomain: "maum-app.firebaseapp.com",
  projectId: "maum-app",
  storageBucket: "maum-app.appspot.com",
  messagingSenderId: "1013547505953",
  appId: "1:1013547505953:web:81c703abb8ae8fd2250660",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
