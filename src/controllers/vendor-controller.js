const Vendor = require('../models/Vendor');

const VENDORS_PER_PAGE = 3;

exports.getVendors = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const vendorsCounted = await Vendor.countDocuments();

        if (vendorsCounted === 0) {
            return res.status(404).json({ message: 'Could not find vendors' });
        }

        const vendors = await Vendor.find()
            .skip((page - 1) * VENDORS_PER_PAGE)
            .limit(VENDORS_PER_PAGE);

        return res.status(200).json({ 
            vendors, 
            hasNextPage: VENDORS_PER_PAGE * page < vendorsCounted,
            lastPage: Math.ceil(vendorsCounted / VENDORS_PER_PAGE)
        });
    } catch (err) {
        return next(err);
    }
}

exports.createVendor = async (req, res, next) => {
    const vendor = req.body;

    try {
        const existingVendor = await Vendor.findOne({
            name: vendor.name
        });

        if (existingVendor) {
            return res.status(409).json({ message: 'Vendor already exists.' });
        }

        const result = await Vendor.create({
            ...vendor
        });

        if (!result) {
            return res.status(400).json({ message: 'Could not create vendor.' });
        }

        return res.status(200).json({ vendor: result });

    } catch (err) {
        return next(err);
    }
}

exports.getVendorById = async (req, res, next) => {
    const vendorId = req.params.vid;

    try {
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ message: 'Could not find vendor' });
        }

        return res.status(200).json({ vendor });
    } catch (err) {
        return next(err);
    }
}

exports.updateVendorById = async (req, res, next) => {
    const vendorId = req.params.vid;
    const vendor = req.body;

    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, {
            ...vendor
        });

        if (!updatedVendor) {
            return res.status(409).json({ message: 'Could not update vendor with id: ' + vendorId });
        }

        return res.status(200).json({ vendor });
    
    } catch (err) {
        return next(err);
    }
}

exports.deleteVendorById = async (req, res, next) => {
    const vendorId = req.params.vid;
    
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

        if (!deletedVendor) {
            return res.status(409).json({ message: 'Could not delete vendor with id: ' + vendorId });
        }

        res.status(200).json({ vendor: deletedVendor });
    } catch (err) {
        return next(err);
    }
}

exports.hasValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.vendorId)) {
        return res.status(404).json({ message: 'Could not find vendor' });
    }

    next();
}

