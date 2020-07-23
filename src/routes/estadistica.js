const express = require ('express');
const router = express.Router();

const estadisticaController = require('../controllers/estadisticaController');

router.get('/estadisticas',estadisticaController.vista);

module.exports = router;