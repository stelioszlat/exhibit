const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    vendor: { type: mongoose.Types.ObjectId, ref: 'Vendor'},
    catalog: { type: mongoose.Types.ObjectId, ref: 'Catalog'},
    creator: {type: String},
    items: [
        { _id: { type: mongoose.Types.ObjectId, ref: 'Exhibit'}, itemQuentity: { type: Number }},
    ],
}, {collection: 'orders',
timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema); 