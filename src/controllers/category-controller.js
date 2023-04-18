const Category = require('../models/Category');

const CATEGORIES_PER_PAGE = 5;

exports.getCategories = async (req, res, next) => {
    const page = +req.query.page || 1;

    try {
        const catalogs = await Category.find()
            .skip((page - 1) * CATEGORIES_PER_PAGE)
            .limit(CATEGORIES_PER_PAGE);

        if (!catalogs) {
            return res.status(400).json({ message: 'Could not find any categories' });
        }
        
        return res.status(200).json({
            catalogs,
            hasNextPage: CATEGORIES_PER_PAGE * page < catalogsCounted,
            lastPage: Math.ceil(catalogsCounted / CATEGORIES_PER_PAGE)
        });
    } catch (err) {
        
    }
}


exports.createCategory = async (req, res, next) => {
    res.status(400).json({ message: 'Could not create category'})
}

exports.getCategoryById = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Could not find category' });
        }

        
        res.status(200).json({ category });
    } catch (err) {
        return next(err);
    }

}

exports.updateCategoryById = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    res.status(200).json({categoryId});
}

exports.deleteCategoryById = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    res.status(200).json({categoryId});
}

