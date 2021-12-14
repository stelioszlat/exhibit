const Section = require('../models/Section');

exports.getSections = (req, res, next) => {
    res.status(200).send("<h4>sections: </h4><ul></ul>");
}


exports.addSection = (req, res, next) => {
    const sectionId = req.params.sid;
    res.status(404);
}

exports.updateSection = (req, res, next) => {
    const sectionId = req.params.sid;
    res.status(404);
}

exports.deleteSection = (req, res, next) => {
    const sectionId = req.params.sid;
    res.status(404);
}