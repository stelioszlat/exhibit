const express = require('express');
const router = express.Router();

const vendorController = require('../controllers/vendor-controller');

// /api/vendor
router.get('', vendorController.getVendors);
router.get('/search', vendorController.searchVendor);
router.post('', vendorController.createVendor);
router.get('/:vid', vendorController.getVendorById);
router.put('/:vid', vendorController.updateVendorById);
router.delete('/:vid', vendorController.deleteVendorById);

module.exports = router;