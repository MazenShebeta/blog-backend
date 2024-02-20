// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh-tGAO12gypPKkFkfGXl_MsMFDB9Sp_s",
  authDomain: "blogarista-5916d.firebaseapp.com",
  projectId: "blogarista-5916d",
  storageBucket: "blogarista-5916d.appspot.com",
  messagingSenderId: "809034038318",
  appId: "1:809034038318:web:1dd1449317a58720f633bf",
  measurementId: "G-M6F65NKZ6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = storage;
