const mongoose = require('mongoose');


const vendorSchema = mongoose.Schema({
    name: {type: String},
    street: {type: String},
    streetNumber: {type: Number},
    zip: {type: Number},
    city: {type: String},
    country: {type: String},
    phones: [
        {type: String}
    ],
    catalogs: [
        {type: mongoose.Types.ObjectId, ref: 'Catalog'}
    ],
    openHour: {type: Number},
    closeHour: {type: Number},
    daysOpen: [
        {type: String}
    ]
}, {collection: 'vendors', timestamps: true});

module.exports = mongoose.model("Vendor", vendorSchema);