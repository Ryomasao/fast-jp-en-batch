import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('key.json')
});

let db = admin.firestore();

db.collection('sentences').get()
  .then(snapshopt => {
    snapshopt.forEach(doc => {
      console.log(doc.id, '=>', doc.data())
    })
  })
  .catch(err => {
    console.log(err)
  })