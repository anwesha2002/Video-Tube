import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyA4NTAh8c0RsJp7Nxh6nnBgo4_gVElrC6s",
    authDomain: "counselor-web.firebaseapp.com",
    projectId: "counselor-web",
    storageBucket: "counselor-web.appspot.com",
    messagingSenderId: "417914818263",
    appId: "1:417914818263:web:35f0cadde168b5ae052a92",
    measurementId: "G-68D1EM7658"
})

export const auth = app.auth()

export default app