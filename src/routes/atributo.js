const express = require('express');
const router = express.Router();

const  atributoController = require('../controllers/atributoController.js');

router.get('/atributo/:id', atributoController.vista);
router.post('/addAtributo', atributoController.save);
router.get('/deleteAtributo/:id',atributoController.delete);
router.get('/updateAtributo/:id',atributoController.update);
router.post('/updateAtributo/:id',atributoController.edit);

module.exports = router;