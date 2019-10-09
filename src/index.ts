import admin from 'firebase-admin'
import data from './data.json'

admin.initializeApp({
  credential: admin.credential.cert('key.json'),
})

const db = admin.firestore()

const { doc } = data
const batch = db.batch()

doc.forEach(sentence => {
  const ref = db.collection('sentences').doc()
  batch.set(ref, sentence)
})

batch
  .commit()
  .then(() => {
    console.log('finish')
  })
  .catch(error => {
    console.log('error')
  })

//db.collection('sentences')
//  .get()
//  .then(snapshopt => {
//    snapshopt.forEach(doc => {
//      console.log(doc.id, '=>', doc.data())
//    })
//  })
//  .catch(err => {
//    console.log(err)
//  })
