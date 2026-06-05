import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// NOTE: Firebase web config is PUBLIC by design. It is shipped to every browser
// that loads the site, so there is no point hiding it in env vars. Access is
// controlled entirely by Firestore security rules (see firestore.rules), not by
// keeping these values secret. Safe to commit.
const firebaseConfig = {
  apiKey: 'AIzaSyBdoT5RWoDLc6-a2zzSf9eW1JM6AHzEpeU',
  authDomain: 'toms-time-capsule.firebaseapp.com',
  projectId: 'toms-time-capsule',
  storageBucket: 'toms-time-capsule.firebasestorage.app',
  messagingSenderId: '653331019614',
  appId: '1:653331019614:web:418df28fd6dea7443f81cf',
  measurementId: 'G-B08MP6NR5N',
};

// Guard against re-initialization during hot-reload / SSR.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
