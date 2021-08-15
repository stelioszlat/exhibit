const express = require('express');

const router = express.Router();

const errorController = require('../controllers/error-controller');

router.use(errorController.get404Page);

module.exports = router;