const Museum = require('../models/Museum');

exports.getMuseums = (req, res, next) => {
    Museum.find().then((museums) => {
        res.json({museums});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}

exports.addMuseum = (req, res, next) => {
    const museumId = req.params.mid; 

    // create museum
}

exports.updateMuseum = (req, res, next) => {
    const museumId = req.params.mid;

    Museum.findOneAndUpdate({_id: museumId}, ...req.params).then(() => {
        res.json({message: "success"});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}

exports.deleteMuseum = (req, res, next) => {
    const museumId = req.params.mid;

    Museum.findOneAndDelete({_id: museumId}).then(() => {
        res.json({message: "successs"});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}