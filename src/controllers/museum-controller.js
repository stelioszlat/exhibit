const Museum = require('../models/Museum');

exports.getMuseums = (req, res, next) => {
    Museum.find().then((museums) => {
        res.json(museums);
    }).catch(err => {
        next(err);
    });
}

exports.getMuseumById = (req, res, next) => {
    const museumId = req.params.mid;

    Museum.findById(museumId).then((museum) => {
        res.json(museum);
    }).catch(err => {
        next(err);
    });
}