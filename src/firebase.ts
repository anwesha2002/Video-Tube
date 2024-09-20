import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

console.log(process.env.REACT_APP_FIREBASE_CONFIG)
const app = firebase.initializeApp( {
    apiKey: process.env.REACT_APP_APILEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

export const auth = app.auth()

export default app