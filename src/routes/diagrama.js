const express = require('express');
const router = express.Router();

const  diagramaController = require('../controllers/diagramaController');

router.get('/diagrama', diagramaController.list);
router.post('/addDiagrama', diagramaController.save);
router.get('/deleteDiagrama/:id',diagramaController.delete);
router.get('/updateDiagrama/:id',diagramaController.update);
router.post('/updateDiagrama/:id',diagramaController.edit);

module.exports = router;