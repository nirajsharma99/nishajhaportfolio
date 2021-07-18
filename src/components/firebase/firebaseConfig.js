import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import dotenv from 'dotenv';
dotenv.config();

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDERID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENTID,
} = process.env;

var firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDERID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENTID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export { firebase, db, auth, storage, timeStamp };
