import firebase from 'firebase';
import {db, storage} from '../../../Firebase';



export function createUser(values, iconSrc) {
  let docRef = db.collection("roomID").doc(values.roomId);
  return (new Promise( (resolve, reject) => {
    docRef.get().then( (doc) => {
    if (doc.exists) {
      resolve(docRef.update({
        users : firebase.firestore.FieldValue.arrayUnion({
          username : values.username,
          cur_hands_up: -1,
          hands : 2,
          iconSrc : iconSrc
        })
      }));
    }
    else {
      resolve(docRef.set({
        lead : {
          index : 0,
          thumbs : 2,　
          win_lose : 0
        },
        total_hands : 2,
        host : values.username,
        round : 0,
        table_state : "waiting",
        users : [{
          username : values.username,
          cur_hands_up: -1,
          hands : 2,
          iconSrc : iconSrc
        }]
      }));
    }
  }).catch(function (error) {
    console.log(error);

  })
}))
}
