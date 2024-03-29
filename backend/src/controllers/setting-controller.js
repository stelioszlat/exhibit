
const Setting = require('../models/Setting');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getSettings = async (req, res, next) => {
    try {
        const settings = await Setting.find({
            username: 'superadmin',
        });

        if (!settings) {
            return res.status(404).json({ message: 'Could not find any settings' });
        }

        res.status(200).json({ settings });
    } catch (err) {
        return next(err);
    }
}

exports.getSettingsByUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
           return res.status(404).json({ message: 'Could not find user with id: ' + userId });
        }

        const settings = await Setting.findMany({
            user: user.username
        });

        if (!settings) {
            return res.status(404).json({ message: 'Could not find settings for user ' + user.name });
        }

        res.status(200).json({ settings });
    } catch (err) {
        return next(err);
    }
}

exports.updateSetting = async (req, res, next) => {
    const setting = req.body;

    try {

        const updatedSetting = await Setting.updateOne({
            settingType: setting.settingType,
        }, {
            settingValue: setting.settingValue
        });

        if (!updatedSetting) {
            return res.status(400).json({ message: 'Could not create setting for user ' + user.name });
        }

        res.status(200).json({ setting: updatedSetting });
    } catch (err) {
        return next(err);
    }
}

exports.updateSettingForUser = async (req, res, next) => {
    const userId = req.params.userId;
    const setting = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Could not find user with id: ' + userId });
        }

        const newSetting = await Setting.updateOne({
            settingType: setting.settingType,
            settingValue: setting.settingValue,
        });

        if (!newSetting) {
            return res.status(400).json({ message: 'Could not create setting for user ' + user.name });
        }

        res.status(200).json({ newSetting });
    } catch (err) {
        return next(err);
    }
}


exports.hasValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.eid)) {
        return res.status(404).json({ message: 'Could not find exhibit' });
    }

    next();
}