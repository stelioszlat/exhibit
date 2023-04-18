const express = require('express');

const catalogController = require('../controllers/catalog-controller');

const router = express.Router();

// /api/catalogs
router.get('', catalogController.getCatalogs);
router.get('/vendor/:vendorId', catalogController.getCatalogsByVendor);
router.get('/:token', catalogController.getGatalogByToken);
router.post('', catalogController.createCatalog);
router.put('/:catalogId', catalogController.updateCatalogById);

module.exports = router;