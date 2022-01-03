const { body, validationResult} = require('express-validator');
const Exhibit = require('../models/Exhibit');
const error = require('../shared/error');

const validators = [];

validators.push(validateName = (req, res, next) => {
    body('name').notEmpty().isLength({max: 20}).isAlphanumeric();
    next();
});

validators.push(validateDescription = (req, res, next) => {
    body('description').isLength({max: 200}).isString();
    next();
})

validators.push(validateImageLocation = (req, res, next) => {
    body('image').isURL();
    next();
});

validators.push(validateSoundLocation = (req, res, next) => {
    body('sound').isURL();
    next();
});

validators.push(validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('errors in validation');
        next(error.throwError("Exhibit is not valid.", 422, errors.array()));
    }
    next();
});

module.exports = validators;