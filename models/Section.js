const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    name: {type: String},
    displayName: {type: String},
    description: {type: String},
    location: {type: String},
    exhibits: [
        {type: String}
    ]
})

const sectionModelTypes = {
    name : "String",
    displayName: "String",
    description: "String",
    location: "String or Object",
    exhibits: "List of Exhibits"
}

module.exports = mongoose.model('Section', sectionSchema);