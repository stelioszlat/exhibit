const express = require('express');
const { param } = require('express-validator');

const exhibitController = require('../controllers/exhibit-controller')

const router = express.Router();

// /api/exhibits
router.get('/', exhibitController.getExhibits);
router.get('/exhibit/:eid', exhibitController.hasValidId, exhibitController.getExhibitById);
router.post('/exhibit', exhibitController.hasValidId, exhibitController.addExhibit);
router.put('/exhibit/:eid', exhibitController.hasValidId, exhibitController.updateExhibitById);
router.delete('/exhibit/:eid', exhibitController.hasValidId, exhibitController.deleteExhibitById);

module.exports = router;