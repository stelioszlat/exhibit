const User = require('../models/User');

exports.getUsers = (req, res, next) => {
    User.find().then(users => {
        res.json({users});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
};

exports.getUserById = (req, res, next) => {
    const userId = req.params.uid;
     User.findById(userId).then(user => {
        res.json({user});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}

exports.addUser = (req, res, next) => {
    const userId = req.params.uid;
    res.status(404);
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.uid;
    res.status(404);
}

exports.deleteUser =  (req, res, next) => {
    const userId = req.params.uid;
    res.status(404);
}