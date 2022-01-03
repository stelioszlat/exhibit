const Museum = require('../models/Museum');
const errorHandler = require('../shared/error');

const MUSEUMS_PER_PAGE = 3;

exports.getMuseums = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalMuseums;
    Museum.countDocuments().then(museumsCounted => {
        totalMuseums = museumsCounted;
        Museum.find()
        skip((page - 1) * MUSEUMS_PER_PAGE)
        .limit(MUSEUMS_PER_PAGE)
    }).then((museums) => {
        res.json({
            museums: museums,
            hasNextPage: MUSEUMS_PER_PAGE * page < totalMuseums,
            lastPage: Math.ceil(totalMuseums / MUSEUMS_PER_PAGE)
        });
    })
    .catch((err) => {
        errorHandler(err);
    });
}

exports.addMuseum = (req, res, next) => {
    const museum = req.body;
    const name = museum.name;
    const address = museum.address;
    const image = req.file;

    Museum.create({
        name: name,
        address: address,
        image: image.path,
    }).then(result => {
        console.log(result);
        res.status(204).json({ message: 'Created museum'});
    }).catch(err => {
        errorHandler(err);
    })
}

exports.updateMuseumById = (req, res, next) => {
    const museumId = req.params.mid;

    Museum.findOneAndUpdate({_id: museumId}, ...req.params).then(() => {
        res.json({message: "success"});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}

exports.deleteMuseumById = (req, res, next) => {
    const museumId = req.params.mid;

    Museum.findOneAndDelete({_id: museumId}).then(() => {
        res.json({message: "successs"});
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
}