"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("express");
const admin = require("firebase-admin"); /* requerimos de firebase admin */
const router = Router();
/* registramos nuestra api con los datos de la bd de firebase */
const db = admin.firestore();
/* insertar */
router.post('/api/products', async (req, res) => {
    try {
        await db.collection('productos')
            .doc('/' + req.body.id + '/') /* aqui creamos el id, si lo dejamos vacío firebase creara el id automaticamente */
            .create({ name: req.body.name });
        return res.status(204).json();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
/* obtener por parametro */
router.get('/api/products/:products_id', async (req, res) => {
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
/* obtener todo */
router.get('/api/products', async (req, res) => {
    try {
        const query = db.collection('productos');
        const querySnapshot = await query.get(); /* nos devuelve un arreglo con todos loas datos */
        const docs = querySnapshot.docs;
        /* pero debemos interpretarlo */
        const response = docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
        }));
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json();
    }
});
/* eliminar */
router.delete('/api/products/:products_id', async (req, res) => {
    try {
        const documents = db.collection('productos').doc(req.params.products_id);
        await documents.delete();
        return res.status(200).json();
    }
    catch (error) {
        return res.status(500).json();
    }
});
/* actualizar */
router.put('/api/products/:products_id', async (req, res) => {
    try {
        const documents = db.collection('productos').doc(req.params.products_id);
        await documents.update({
            name: req.body.name
        });
        return res.status(200).json();
    }
    catch (error) {
        return res.status(500).json();
    }
});
module.exports = router;
//# sourceMappingURL=products.routes.js.map