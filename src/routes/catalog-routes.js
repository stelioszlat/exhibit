const express = require('express');

const catalogController = require('../controllers/catalog-controller');

const router = express.Router();

// /api/catalogs
router.get('/:token', catalogController.getGatalogByToken);

module.exports = router;