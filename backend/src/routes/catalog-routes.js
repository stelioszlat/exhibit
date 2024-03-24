const express = require('express');

const catalogController = require('../controllers/catalog-controller');

const router = express.Router();

// /api/catalog
router.get('', catalogController.getCatalogs);
router.get('/vendor/:vendorId', catalogController.getCatalogsByVendor);
router.get('/:catalogId', catalogController.getCatalogById);
router.post('', catalogController.createCatalog);
router.put('/:catalogId', catalogController.updateCatalogById);

module.exports = router;