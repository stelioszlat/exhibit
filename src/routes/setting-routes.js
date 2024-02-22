const express = require('express');

const router = express.Router();
const settingController = require('../controllers/setting-controller');

// /api/setting
router.get('/user/:userId', settingController.getSettingsByUser);
router.post('/user/:userId', settingController.createSettingForUser);

module.exports = router;