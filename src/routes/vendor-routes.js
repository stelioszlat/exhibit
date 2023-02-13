const express = require('express');
const router = express.Router();

const vendorRoutes = require('../controllers/vendor-controller');

// /api/vendors
router.get('/', vendorRoutes.getVendors);

router.get('/vendor/:vid', vendorRoutes.getVendorById);

module.exports = router;