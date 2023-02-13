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