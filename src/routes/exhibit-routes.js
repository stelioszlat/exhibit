const express = require('express');
const { param } = require('express-validator');

const validator = require('../validation/exhibitValidation');
const exhibitController = require('../controllers/exhibit-controller')

const router = express.Router();

router.get('/', param('name').custom(validator.validateName), exhibitController.getExhibits);
router.get('/exhibit/:eid', exhibitController.getExhibitById);

module.exports = router;