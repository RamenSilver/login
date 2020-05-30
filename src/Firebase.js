import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import * as dotenv from 'dotenv';

require('dotenv').config();
const firebaseConfig = {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_DATABASEURL,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      appId: process.env.REACT_APP_APPID
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
export const storage = firebase.storage();
