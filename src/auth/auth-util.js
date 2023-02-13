const { connect } = require('mongoose');
const { createClient } = require('redis');
const morgan = require('morgan');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');

dotenv.config();
const host = process.env.REDIS_HOST;
const secret = process.env.SECRET;

const client = createClient({
    url: host
});

exports.connectDb = (uri, options) => {
    connect(uri, {   
        ...options,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(value => {
        console.log("Connected to database on " + uri);
    }).catch(err => {
        console.log({error: err});
    });
}

exports.connectCache = async () => {
    await client.connect().then(() => { 
        console.log("Connected to cache on " + host) 
    }).catch(err => {
        console.log(err);
    });
}

exports.getFromCache = async (key) => {
    return await client.get(key).then(data => { return JSON.parse(data)});
}

exports.setToCache = async (key, value) => {
    return await client.set(key, JSON.stringify(value));
}

exports.deleteFromCache = async (key) => {
    return await client.del(key);
}

exports.getManyFromCache = async (pattern) => {
    return await client.keys(pattern);
}

exports.apiLogger = morgan(function (tokens, req, res) {
    return [
        '[API]',
        tokens.date(req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        // tokens['response-time'](req, res), 'ms'
    ].join(' ')
});

exports.userExists = async (req, res, next) => {
    // check if user exists
    const userEmail = req.body.email;

    try {

        const user = await User.find({
            email: userEmail
        });

        if (user.length !== 0) {
            return res.status(409).json({ message: 'User already exists.' });
        }

    } catch (err) {
        return next(err);
    }

    next();
}

exports.userHasToken = async (req, res, next) => {
    // check if user has active token
    const userId = req.params.uid;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(409).json({ message: 'Could not find user.' });
        }

        if (user.token) {
            return res.status(409).json({ message: 'User has already a token.'});
        }

    } catch (err) {
        return next(err);
    }

    next();
}

exports.signToken = (user) => {
    return jwt.sign({
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin 
    }, secret, { expiresIn: '1h'});
}

exports.authenticate = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const authHeader = req.get('Authorization')
        if (!authHeader) {
            return res.status(401).json({ message: 'No Authorization header found' });
        }

        const token = authHeader.split(' ')[1];
        if (!jwt.decode(token)) {
            return res.status(401).json({ message: 'Invalid Token' });
        }

        const decodedToken = jwt.verify(token, secret);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Not authenticated.' });
        }

        if (decodedToken.isAdmin) {
            req.isAdmin = true;
        }

        if (decodedToken.username) {
            req.username = decodedToken.username;
        }
        
        next();
    } catch (err) {
        return next(err);
    }
};

exports.isAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    next();
}

exports.isSelf = async (req, res, next) => {
    const userId = req.param.userId;
    if (userId) {
        try {
            const user = await User.findById(userId);

            if (!(user.username === req.username)) {
                return res.status(403).json({ message: "You are not authorized to access this resource (self)" });
            }
        } catch (err) {
            return next(err);
        }
    }
    next();
}


