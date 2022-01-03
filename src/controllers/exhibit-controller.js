const Exhibit = require('../models/Exhibit');

const ITEMS_PER_PAGE = 2;

exports.getExhibits = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalExhibits;
    Exhibit.countDocuments().then(exhibitCount => {
        totalExibits = exhibitCount;
        return Exhibit.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(exhibits => {
        res.json({
            exhibits: exhibits,
            hasNextPage: ITEMS_PER_PAGE * page < totalExhibits,
            lastPage: Math.ceil(totalExhibits / ITEMS_PER_PAGE)
        });
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
        next(err);
    });
};