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
app.get('/hello-world', (req, res) => {
    return res.status(200).json({ message: 'hello world' });
});
app.use(require('./routes/products.routes'));
exports.app = functions.https.onRequest(app);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
/* export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
}); */
//# sourceMappingURL=index.js.map