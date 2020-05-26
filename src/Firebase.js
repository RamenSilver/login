import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: "ajdhfkj1",
      storageBucket: process.env.STRORAGEBUCKET,
      appId: process.env.APPID
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
