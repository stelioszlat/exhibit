const Exhibit = require('../models/Exhibit');

const ITEMS_PER_PAGE = 10;

exports.getExhibits = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const countedExhibits = await Exhibit.countDocuments();

        if (countedExhibits === 0) {
            return res.status(404).json({ message: 'Could not find exhibits' });
        }

        const exhibits = await Exhibit.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limig(ITEMS_PER_PAGE);
        
        return res.status(200).json({
            exhibits,
            hasNextPage: ITEMS_PER_PAGE * page < totalExhibits,
            lastPage: Math.ceil(totalExhibits / ITEMS_PER_PAGE) 
        })
    } catch (err) {
        return next(err);
    };
};

exports.getExhibitById = async (req, res, next) => {
    const exhibitId = req.params.eid;

    try {
        const exhibit = await Exhibit.findById(exhibitId);

        if (!exhibit) {
            return res.status(404).json({ message: 'Could not find exhibit' });
        }

        return res.status(200).json({ exhibit });
    
    } catch (err) {
        return next(err);
    }
};

exports.addExhibit = async (req, res, next) => {
    const exhibit = req.body;
    const name = exhibit.name;
    const description = exhibit.description;
    const image = req.file;
    const value = exhibit.value;

    try {
        const existingExhibit = await Exhibit.findOne({ name });

        if (existingExhibit) {
            return res.status(409).json({ message: 'Exhibit already exists' });
        }

        const newExhibit = await Exhibit.create({
            name,
            description
        });

        return res.status(200).json({ newExhibit });
    } catch (err) {
        return next(err);
    }
};

exports.updateExhibitById = (req, res, next) => {
    const exhibitId = req.params.eid;

    return res.status(404).json({message: "Exhibit not found"});;
}

exports.deleteExhibitById = async (req, res, next) => {
    const exhibitId = req.params.eid;

    try {
        const existingExhibit = await Exhibit.findById(exhibitId);

        if (!existingExhibit) {
            return res.status(404).json({ message: 'Exhibit does not exist' });
        }

        const exhibit = await Exhibit.findByIdAndDelete(exhibitId);

        return res.status(200).json({ exhibit });
    
    } catch (err) {
        return next(err);
    }
}

exports.hasValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.eid)) {
        return res.status(404).json({ message: 'Could not find exhibit' });
    }

    next();
}