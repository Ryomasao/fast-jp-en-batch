import admin from 'firebase-admin'
import data from './data.json'
import uuid from 'uuid/v1'

// TODO jsonで読み込んだオブジェクトに型をつけたい
//interface Sentence {
//  en: {
//    sentence: string
//    note: string
//  }
//  jp: {
//    sentence: string
//    note: string
//  }
//  category: string
//  uid: string
//  id: string
//}

const init = (): FirebaseFirestore.Firestore => {
  admin.initializeApp({
    credential: admin.credential.cert('key.json'),
  })
  return admin.firestore()
}

const addDoc = (db: FirebaseFirestore.Firestore): void => {
  const { doc } = data
  const batch = db.batch()

  doc.forEach(sentence => {
    const ref = db.collection('sentences').doc()
    batch.set(ref, { ...sentence, id: uuid() })
  })

  batch
    .commit()
    .then(() => {
      console.log('finish')
    })
    .catch(error => {
      console.log('add data was failed.')
      throw error
    })
}

const deleteDoc = async (db: FirebaseFirestore.Firestore): Promise<void> => {
  try {
    const snapshot = await db.collection('sentences').get()

    if (snapshot.size === 0) {
      return
    }

    const batch = db.batch()
    snapshot.docs.forEach(doc => batch.delete(doc.ref))
    await batch.commit()
  } catch (e) {
    console.log('delete doc failed')
    throw e
  }
}

type operation = 'add' | 'get' | 'delete'

const main = (): void => {
  if (process.argv.length < 3) {
    throw new Error('you need an argument [add|get|delete]')
  }

  const operation: operation = process.argv[2] as operation
  const db = init()

  switch (operation) {
    case 'add':
      addDoc(db)
      break
    case 'delete':
      deleteDoc(db)
      break
    default:
      throw new Error(`your arugment '${operation}' is wrong `)
  }
}

main()

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
