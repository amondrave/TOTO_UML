const express = require('express');
const router = express.Router();

const  relacionController = require('../controllers/relacionController.js');

router.get('/relacion/0', relacionController.vista);
router.get('/relacion/:id', relacionController.origen);
router.post('/addRelacion', relacionController.save);
router.get('/deleteRelacion/:id',relacionController.delete);
// router.get('/updateRelacion/:id',relacionController.update);
// router.post('/updateRelacion/:id',relacionController.edit);

module.exports = router;