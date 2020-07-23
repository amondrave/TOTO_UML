const express = require('express');
const router = express.Router();

const  claseController = require('../controllers/claseController.js');

router.get('/clase/:id', claseController.vista);
router.post('/addClase', claseController.save);
router.get('/deleteClase/:id',claseController.delete);
router.get('/updateClase/:id',claseController.update);
router.post('/updateClase/:id',claseController.edit);

module.exports = router;