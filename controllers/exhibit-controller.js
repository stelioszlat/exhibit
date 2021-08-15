const Exhibit = require('../models/Exhibit');

exports.getExhibits = async (req, res, next) => { 
    try {
        const result = await Exhibit.find();
        if (result) {
            res.status(200).json({result});
        }
        res.status(400).json({result});
    }
    catch (err) {
        return next(err);
    }
};

exports.getExhibit = async (req, res, next) => {
    const exhibitId = req.params.eid;
    try {
        const result = await Exhibit.findById(exhibitId);
        if (result) {
            res.status(200).json({result});
        }
        res.status(400).json({message: 'could not find exhibit'});
    }
    catch (err) {
        return next(err);
    }
};