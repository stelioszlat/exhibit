const express = require('express');
const path = require('path');

const exhibitController = require('../controllers/exhibit-controller')

const router = express.Router();

router.get('/', exhibitController.getExhibits);

router.get('/exhibit/:eid', exhibitController.getExhibit);

module.exports = router;