const Exhibit = require('../models/Exhibit');

exports.getExhibits = (req, res, next) => { 
    Exhibit.find().then(exhibits => {
        res.json({exhibits});
    }).catch(err => {
        // next(err);
        next(err);
    });
};

exports.getExhibitById = (req, res, next) => {
    const exhibitId = req.params.eid;

    Exhibit.findById(exhibitId).then(exhibit => {
        res.json({exhibit});
    }).catch(err => {
        // next(err);
        next(err);
    });
};