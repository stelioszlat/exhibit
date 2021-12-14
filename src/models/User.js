const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String},
    password: {type: String},
    role: {type: String}
}, {collection: "users"});

module.exports = mongoose.model("User", userSchema);