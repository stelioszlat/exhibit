const express = require('express');
const { param } = require('express-validator');

const exhibitController = require('../controllers/exhibit-controller')
const vendorController = require('../controllers/vendor-controller');

const router = express.Router();

// /api/exhibit
router.get('', exhibitController.getExhibits);
router.get('/:eid', exhibitController.hasValidId, exhibitController.getExhibitById);
router.get('/vendor/:vendorId', vendorController.hasValidId, exhibitController.getExhibitsByVendorId);
router.post('', exhibitController.addExhibit);
router.put('/:eid', exhibitController.hasValidId, exhibitController.updateExhibitById);
router.delete('/:eid', exhibitController.hasValidId, exhibitController.deleteExhibitById);

module.exports = router;