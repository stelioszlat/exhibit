const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.SECRET;

exports.getUsers = async (req, res, next) => {
    // get all users
    try {
        const users = await User.find();

        if (!users) {
            return res.status(409).json({ message: 'Could not find users.' });
        }

        res.status(200).json({ users });
    
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

exports.createUser = async (req, res, next) => {
    const { email, username, isAdmin, isSuperAdmin, password, rePassword } = req.body;

    if (!email) {
        return res.status(409).json({ message: 'You need to enter email'});
    }

    if (!username) {
        return res.status(409).json({ message: 'You need to enter username'});
    }

    if (!password) {
        return res.status(409).json({ message: 'You need to enter password'});
    }

    if (!rePassword) {
        return res.status(409).json({ message: 'You need to re-enter password'});
    }

    if (password !== rePassword) {
        return res.status(409).json({ message: 'Re-entered password does not match' });
    }

    try {

        const existingUser = await User.findOne({
            username: username,
            email: email
        });

        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
        }

        const apiToken = jwt.sign({
            username: username,
            password: password,
            active: true,
            isAdmin: isAdmin,
            isSuperAdmin: isSuperAdmin,
        }, secret, {expiresIn: '1m'});

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username: username,
            email: email,
            active: true,
            isAdmin: isAdmin,
            isSuperAdmin: isSuperAdmin,
            apiToken: apiToken,
            password: hashedPassword,
        });
    
        const result = await user.save();

        if (!result) {
            return res.status(409).json({ message: 'Could not create user.'});
        }
        
        res.status(200).json({ user });

    } catch (err) {
        return next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.uid;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        let {username, email, isAdmin, isSuperAdmin, active, apiToken} = user;
        res.status(200).json({username, email, isAdmin, isSuperAdmin, active, apiToken});
    
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

exports.getUserTokensById = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json([user.apiToken]);
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

exports.updateUserById = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            ...req.body
        });

        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json({ user });
    
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

exports.deleteUserById = async (req, res, next) => {
    const userId = req.params.uid;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json({ user });
    
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

exports.hasValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.uid)) {
        return res.status(404).json({ message: 'Could not find user.' });
    }

    next();
}