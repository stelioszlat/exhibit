const mongoose = require('mongoose');

exports.SettingType = {
    EXHIBITS_PER_PAGE: 'EXHIBITS_PER_PAGE',
    CATALOGS_PER_PAGE: 'CATALOGS_PER_PAGE',
    CATEGORIES_PER_PAGE: 'CATEGORIES_PER_PAGE'
}

const settingSchema = mongoose.Schema({
    user: { type: string},
    settingType: { type: string},
    settingValue: { type: string}
}, {collection: 'settings',
timestamps: true}
);

module.exports = mongoose.model('Setting', settingSchema); 