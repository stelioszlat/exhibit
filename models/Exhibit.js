const mongoose = require('mongoose');

const exhibitSchema = mongoose.Schema({
    name: {type: String},
    displayName: {type: String},
    description: {type: String },
    image: {type: String},
    sound: {type: String},
    arrived: {type: Date},
    created: {type: Date},
    creator: {type: String},
    value: {type: Number}
}, {collection: 'exhibits'});

const exhibitModelTypes = {
    name : "String",
    displayName : "Stirng", 
    description : "String",
    image: "String (image uri)",
    sound: "String (sound uri)",
    arrived: "Date",
    created: "Date",
    creator: "String",
    value: "Integer"
}

module.exports = mongoose.model("Exhibit", exhibitSchema);