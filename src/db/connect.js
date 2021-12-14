const mongoose = require('mongoose');
const logger = require('../util/logger');

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
        return connection;
    } catch (err){
        // logger.error({error: err});
        next(err);
    }
}