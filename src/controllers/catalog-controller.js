const Catalog = require('../models/Catalog');
const Vendor = require('../models/Vendor');

const CATALOGS_PER_PAGE = 5;

exports.getCatalogs = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const catalogsCounted = await Catalog.countDocuments();

        if (catalogsCounted === 0) {
            return res.status(404).json({ message: 'Could not find catalogs' });
        }

        const catalogs = await Catalog.find()
            .skip((page - 1) * CATALOGS_PER_PAGE)
            .limit(CATALOGS_PER_PAGE);
    
        return res.status(200).json({
            catalogs,
            hasNextPage: CATALOGS_PER_PAGE * page < catalogsCounted,
            lastPage: Math.ceil(catalogsCounted / CATALOGS_PER_PAGE)
        });
    } catch (err) {
        return next(err);
    }
}

exports.getCatalogById = async (req, res, next) => {
    const catalogId = req.params.catalogId;

    try {
        const catalog = await Catalog.findById(catalogId).populate({
            path: 'categories',
            populate: { path: 'exhibits' }
        });

        const token = catalog.tokens.find(token => token === req.query.token);

        return res.status(200).json({ catalog });

    } catch (err) {
        console.log(err);
    }
}

exports.getCatalogsByVendor = async (req, res, next) => {
    const vendorId = req.params.vendorId;

    try {
        const vendor = await Vendor.findById(vendorId);
        
        if (!vendor) {
            return res.status(404).json({ message: 'Could not find vendor'});
        }
        
        const catalogs = await Catalog.find({
            vendor: vendor._id
        }).populate({
            path: 'categories',
            populate: { path: 'exhibits' }
        });

        if (!catalogs) {
            return res.status(404).json({ message: 'Could not find catalogs' });
        }

        return res.status(200).json({ catalogs });
    } catch (err) {
        return next(err);
    }
}

exports.createCatalog = async (req, res, next) => {
    
    res.status(200).json('new catalog');
}

exports.updateCatalogById = async (req, res, next) => {
    const catalogId = req.params.catalogId;

    res.status(404).json('Could not find catalog');
}