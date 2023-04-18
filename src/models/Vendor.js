const mongoose = require('mongoose');


const vendorSchema = mongoose.Schema({
    name: {type: String},
    address: {type: String},
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

const museumModelTypes = {
    name: "String",
    address: "String",
    phones: "List of Strings or Objects",
    sections: "List of Strings",
    exhibits: "List of Strings",
    openHour: "Integer",
    closeHour: "Integer",
    daysOpen: "List of Strings"
}

module.exports = mongoose.model("Vendor", vendorSchema);