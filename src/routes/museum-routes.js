const express = require('express');
const router = express.Router();
const Museum = require('../models/Museum');

const museumRoutes = require('../controllers/museum-controller');

router.get('/', museumRoutes.getMuseums);

router.get('/museum/:mid', museumRoutes.getMuseumById);

module.exports = router;