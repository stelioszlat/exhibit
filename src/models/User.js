const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean },
    isSuperAdmin: { type: Boolean},
    lastLogin: { type: String },
    apiToken: { type: String },
    vendor: { type: mongoose.Types.ObjectId, ref: 'Vendor'},
}, {collection: 'users', timestamps: true});

module.exports = mongoose.model("User", userSchema);