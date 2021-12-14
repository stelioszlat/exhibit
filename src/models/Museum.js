const mongoose = require('mongoose');


const museumSchema = mongoose.Schema({
    name: {type: String},
    address: {type: String},
    phones: [
        {type: String}
    ],
    sections: [
        {type: String}
    ],
    openHour: {type: Number},
    closeHour: {type: Number},
    daysOpen: [
        {type: String}
    ],
    isOpen: {type: Boolean}
}, {collection: 'museums', timestamps: true});

const museumModelTypes = {
    name: "String",
    address: "String",
    phones: "List of Strings or Objects",
    sections: "List of Strings",
    exhibits: "List of Strings",
    openHour: "Integer",
    closeHour: "Integer",
    daysOpen: "List of Strings",
    isOpen: "Boolean"
}

module.exports = mongoose.model("Museum", museumSchema);