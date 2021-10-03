import * as functions from "firebase-functions";
import * as admin from 'firebase-admin' /* requerimos de firebase admin */
import * as express from "express"

const app = express()
/* registramos nuestra api con los datos de la bd de firebase */
admin.initializeApp({
  credential: admin.credential.cert('./credential.json'),
  databaseURL: 'https://fb-api-da617.firebaseio.com'
})

const db = admin.firestore()

app.get('/hello-world', (req, res) => {
  return res.status(200).json({message: 'hello world'})
})

app.post('/api/products', async (req, res) => {
 try {
  await db.collection('productos')
  .doc('/' + req.body.id + '/') /* aqui creamos el id, si lo dejamos vacío firebase creara el id automaticamente */
  .create({ name: req.body.name })
  return res.status(204).json();
 }
  catch (error) {
   console.log(error);
   return res.status(500).send(error)
 }
})

app.get('/api/products/:products_id', async (req, res) => {
  
    try {
      const doc = db.collection('productos').doc(req.params.products_id)
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    }
     catch (error) {
     return res.status(500).send(error)   
    }
  
})

app.get ('/api/products', async (req, res) =>{
  try {
    
   const query = db.collection('productos');
   const querySnapshot = await query.get(); /* nos devuelve un arreglo con todos loas datos */
   const docs = querySnapshot.docs;

   /* pero debemos interpretarlo */
   const response = docs.map(  (doc) => ({
     id: doc.id,
     name: doc.data().name,
   }));
   return res.status(200).json(response)

  } catch (error) {
    return res.status(500).json();
  }
})


exports.app = functions.https.onRequest(app)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

 /* export const helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
}); */
