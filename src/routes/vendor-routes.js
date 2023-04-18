const express = require('express');
const router = express.Router();

const vendorController = require('../controllers/vendor-controller');

// /api/vendors
router.get('', vendorController.getVendors);
router.post('', vendorController.createVendor);
router.get('/vendor/:vid', vendorController.getVendorById);
router.put('/vendor/:vid', vendorController.updateVendorById);
router.delete('/vendor/:vid', vendorController.deleteVendorById);

module.exports = router;