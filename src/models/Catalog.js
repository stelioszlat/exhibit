const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
    name: { type: String },
    vendor: { type: mongoose.Types.ObjectId, ref: 'Vendor' },               // type vendor
    version: { type: Number },
    categories: [
        { type: mongoose.Types.ObjectId, ref: 'Category'}
    ],
    items: [
        { type: mongoose.Types.ObjectId, ref: 'Exhibit'}
    ],
    tokens: [
        { type: String }
    ]
}, {collection: 'catalogs', timestamps: true})

module.exports = mongoose.model('Catalog', catalogSchema);