import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, auth, db, onAuthStateChanged, signOut };

export async function loginWithEmailAndPassword(email, password) {
  if (!auth) throw new Error('Firebase no está configurado.');
  return signInWithEmailAndPassword(auth, email, password);
}

export async function createAccountWithEmailAndPassword(email, password) {
  if (!auth) throw new Error('Firebase no está configurado.');
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function saveAnalysisToCloud(userId, analysis) {
  if (!db) throw new Error('Firebase no está configurado.');
  const ref = doc(db, 'users', userId, 'analyses', analysis.id);
  await setDoc(
    ref,
    {
      title: analysis.title || 'Análisis sin título',
      sentence: analysis.sentence || '',
      level: analysis.level || 'eso',
      mode: analysis.mode || 'arbol',
      payload: analysis,
      updatedAt: serverTimestamp(),
      createdAt: analysis.createdAt || serverTimestamp(),
    },
    { merge: true }
  );
}

export async function loadLatestCloudAnalysis(userId) {
  if (!db) throw new Error('Firebase no está configurado.');
  const analysesRef = collection(db, 'users', userId, 'analyses');
  const q = query(analysesRef, orderBy('updatedAt', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const item = snapshot.docs[0].data();
  return item.payload || null;
}
