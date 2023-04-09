const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
    vendor: { type: String },               // type vendor
    version: { type: Number },
    categories: [
        { type: String}
    ],
    items: [
        { type: String },                    // type exhibit
    ],
    token: { type: String}
})

module.exports = mongoose.model('Catalog', catalogSchema);