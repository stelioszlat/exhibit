const mongoose = require('mongoose');

exports.SettingType = {
    EXHIBITS_PER_PAGE: 'EXHIBITS_PER_PAGE',
    CATALOGS_PER_PAGE: 'CATALOGS_PER_PAGE',
    CATEGORIES_PER_PAGE: 'CATEGORIES_PER_PAGE'
}

const settingSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User'},
    username: { type: String},
    settingType: { type: String},
    settingValue: { type: String}
}, {collection: 'settings',
timestamps: true}
);

module.exports = mongoose.model('Setting', settingSchema); 