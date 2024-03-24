const express = require('express');

const categoryController = require('../controllers/category-controller');

const router = express.Router();

// /api/category
router.get('', categoryController.getCategories);
router.post('', categoryController.createCategory);
router.get('/:categoryId', categoryController.getCategoryById);
router.put('/:categoryId', categoryController.updateCategoryById);
router.delete('/:categoryId', categoryController.deleteCategoryById);

module.exports = router;