const express = require('express');

const router = express.Router();
const settingController = require('../controllers/setting-controller');

// /api/setting
router.get('', settingController.getSettings);
router.get('/user/:userId', settingController.getSettingsByUser);
router.put('', settingController.updateSetting);
router.put('/user/:userId', settingController.updateSettingForUser);

module.exports = router;