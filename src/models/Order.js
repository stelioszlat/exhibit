const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    creator: {type: String},
    items: [
        { type: mongoose.Types.ObjectId, ref: 'Exhibit' },
    ],
}, {collection: 'orders',
timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema); 