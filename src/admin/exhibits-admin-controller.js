const Exhibit = require('../models/Exhibit');

exports.getExhibits = (req, res, next) => {
    Exhibit.find((exhibits) => {
        return res.json({exhibits});
    }).catch((err) => {
        next(err);
    });
}

exports.addExhibit = (req, res, next) => {
    res.status(404);
}

exports.updateExhibit = (req, res, next) => {
    const exhibitId = req.params.eid;
    res.status(404);
}

exports.deleteExhibit = (req, res, next) => {
    const exhibitId = req.params.eid;
    res.status(404);
}