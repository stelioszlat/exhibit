const express = require('express');


const router = express.Router();

// /api/categories
router.get('', (req, res, next) => {
    res.status(200).json({})
});

router.get('/:categoryId', (req, res, next) => {
    const categoryId = req.params.categoryId;

    res.status(200).json({categoryId});
})

module.exports = router;