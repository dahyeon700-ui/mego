import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, addDoc, getDocs, query, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const cfg = window.FIREBASE_CONFIG || {};
if (cfg.apiKey && !/여기/.test(cfg.apiKey)) {
  const app = initializeApp(cfg), fs = getFirestore(app), auth = getAuth(app);
  window.MEGO_AUTH = makeMegoAuth({ auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged });
  const db = makeMegoDB({ fs, doc, getDoc, setDoc, deleteDoc, collection, addDoc, getDocs, query, limit });
  window.claude = { use: async (n) => (n === 'db' ? db : null) };
} else {
  console.warn('MEGO MOVE: config.js에 Firebase 설정이 없어요. 로그인 없이 이 폰에서만 쓰기로 동작해요.');
  window.claude = { use: async () => null };
}
