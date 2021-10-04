import * as functions from "firebase-functions";
import * as admin from 'firebase-admin' /* requerimos de firebase admin */
import * as express from "express"

const app = express()

admin.initializeApp({
  credential: admin.credential.cert('./credential.json'),
  databaseURL: 'https://fb-api-da617.firebaseio.com'
})

app.get('/hello-world', (req, res) => {
  return res.status(200).json({ message: 'hello world' })
})

app.use(require('./routes/products.routes'))

exports.app = functions.https.onRequest(app)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

/* export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
}); */
