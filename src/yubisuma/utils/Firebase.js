import firebase from 'firebase';
import 'firebase/firestore';
class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STRORAGEBUCKET,
      appId: process.env.APPID
  });
    // 匿名認証
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  }



}
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
