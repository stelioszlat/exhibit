const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {type: String},
    displayName: {type: String},
    description: {type: String},
    catalog: {type: mongoose.Types.ObjectId, ref: 'Catalog'},
    exhibits: [
        {type: mongoose.Types.ObjectId, ref: 'Exhibit'}
    ]
}, {collection: 'categories', timestamps: true});

const sectionModelTypes = {
    name : "String",
    displayName: "String",
    description: "String",
    location: "String or Object",
    exhibits: "List of Exhibits"
}

module.exports = mongoose.model('Category', categorySchema);