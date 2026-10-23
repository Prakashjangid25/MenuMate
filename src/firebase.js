import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDv2jI5IR1NuiIEB8LBV3CbeTeh6g9issc",
  authDomain: "menumate-saas.firebaseapp.com",
  projectId: "menumate-saas",
  storageBucket: "menumate-saas.firebasestorage.app",
  messagingSenderId: "93021642202",
  appId: "1:93021642202:web:0b01d1d59f8903c38c34e3"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
