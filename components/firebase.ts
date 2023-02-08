import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSEGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// };

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
