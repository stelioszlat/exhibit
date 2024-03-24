const mongoose = require('mongoose');
const logger = require('../util/logger');
const error = require('../shared/error');

exports.connect = async function connect(uri, options, next){
    try {
        const connection = await mongoose.connect(
            uri,
            {   
                ...options,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to databse: " + uri);
        return connection;
    } catch (err){
        // logger.error({error: err});
        // error.errorHandler(err);
        console.log(err);
    }
}