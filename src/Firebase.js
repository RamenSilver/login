import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA7RML4Ze8J4ZMVdrGtp2Zb_eaKOGByb18",
    authDomain: "https://yubisuma.web.app",
    databaseURL: "https://yubisuma.firebaseapp.com",
    projectId: "ajdhfkj1",
    storageBucket: "gs://ajdhfkj1.appspot.com",
    appId: "1:414781893389:web:3e5672eb09fdef7caf1e44",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
