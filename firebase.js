import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDbVWptda-M4bZGiuiEFWqbRQjVV22ReMY",
    authDomain: "budget-familial-23555.firebaseapp.com",
    projectId: "budget-familial-23555",
    storageBucket: "budget-familial-23555.firebasestorage.app",
    messagingSenderId: "264202634067",
    appId: "1:264202634067:web:8d7d301854fee502e597a6"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.auth = auth;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.onAuthStateChanged = onAuthStateChanged;
window.signOut = signOut;
console.log("Firestore connecté ✅");
