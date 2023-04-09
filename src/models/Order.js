const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    created: {type: Date},
    creator: {type: String},
    items: [
        { type: String },
    ],
}, {collection: 'exhibits',
timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema); 