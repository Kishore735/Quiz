// js/firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDnPWakEkCtqEt21WSL3wqnkUlXw9ITdeU",
    authDomain: "intel-de8f5.firebaseapp.com",
    projectId: "intel-de8f5",
    storageBucket: "intel-de8f5.firebasestorage.app",
    messagingSenderId: "465263869181",
    appId: "1:465263869181:web:cccb709f5ada2916cfd294",
    measurementId: "G-L0FE80VPF4"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize services
  const firestore = firebase.firestore();
  const auth = firebase.auth();