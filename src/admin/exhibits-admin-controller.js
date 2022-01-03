const Exhibit = require('../models/Exhibit');
const { errorHandler } = require('../shared/error');

const EXHIBITS_PER_PAGE = 2;

exports.getExhibits = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalExhibits;
    Exhibit.countDocuments().then(exhibitCount => {
        totalExibits = exhibitCount;
        return Exhibit.find()
        .skip((page - 1) * EXHIBITS_PER_PAGE)
        .limit(EXHIBITS_PER_PAGE);
    })
    .then(exhibits => {
        res.json({
            exhibits: exhibits,
            hasNextPage: EXHIBITS_PER_PAGE * page < totalExhibits,
            lastPage: Math.ceil(totalExhibits / EXHIBITS_PER_PAGE)
        });
    })
    .catch(err => {
        errorHandler(err);
    });
}

exports.addExhibit = (req, res, next) => {
    const exhibit = req.body;
    const name = exhibit.name;
    const description = exhibit.description;
    const image = req.file;
    const value = exhibit.value;

    Exhibit.create({
        name: name,
        description: description,
        image: image.path,
        value: value
    }).then(result => {
        console.log(result);
        res.json({message: "Success"});
    }).catch(err => {
        errorHandler(err);
    });
}

exports.updateExhibitById = (req, res, next) => {
    const exhibitId = req.params.eid;
    // may use graphql here
    res.status(404).json({message: "Page not found"});;
}

exports.deleteExhibitById = (req, res, next) => {
    const exhibitId = req.params.eid;
    Exhibit.findByIdAndDelete(exhibitId).then(result => {
        console.log(result);
        res.status(204).json({message: "Deleted exhibit"});
    }).catch(err => {
        errorHandler(err);
    });
}