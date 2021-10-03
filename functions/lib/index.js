"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin"); /* requerimos de firebase admin */
const express = require("express");
const app = express();
admin.initializeApp({
    credential: admin.credential.cert('./credential.json'),
    databaseURL: 'https://fb-api-da617.firebaseio.com'
});
const db = admin.firestore();
app.get('/hello-world', (req, res) => {
    return res.status(200).json({ message: 'hello wold' });
});
app.post('/api/products', async (req, res) => {
    try {
        await db.collection('productos')
            .doc('/' + req.body.id + '/')
            .create({ name: req.body.name });
        return res.status(204).json();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
app.get('/api/products/:products_id', async (req, res) => {
    try {
        const doc = db.collection('productos').doc(req.params.products_id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.app = functions.https.onRequest(app);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
/* export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
}); */
//# sourceMappingURL=index.js.map