const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const usersAdminController = require('../admin/users-admin-controller');
const museumsAdminController = require('../admin/museums-admin-controller');
const exhibitsAdminController = require('../admin/exhibits-admin-controller');
const sectionsAdminController = require('../admin/sections-admin-controller');

const exhibitValidation = require('../validation/exhibitValidation');

router.get('', (req, res, next) => { res.status(200).send("<h1>Admin Page</h1>") });

router.get('/users', usersAdminController.getUsers);
router.get('/user/:uid', usersAdminController.getUserById);
router.post('/user/add', usersAdminController.addUser);
router.put('/user/:uid/update', usersAdminController.updateUser);
router.delete('/user/:uid/delete', usersAdminController.deleteUser);

router.get('/museums', museumsAdminController.getMuseums);
router.post('/museum/add', museumsAdminController.addMuseum);
router.put('/museum/:mid/update', museumsAdminController.updateMuseumById);
router.delete('/museum/:mid/delete', museumsAdminController.deleteMuseumById);

router.get('/exhibits', exhibitsAdminController.getExhibits);
router.post('/exhibit/add', exhibitValidation, exhibitsAdminController.addExhibit);
router.put('/exhibit/:eid/update', exhibitValidation, exhibitsAdminController.updateExhibitById);
router.delete('/exhibit/:eid/delete', exhibitValidation, exhibitsAdminController.deleteExhibitById);

router.get('/sections', sectionsAdminController.getSections);
router.post('/section/add', sectionsAdminController.addSection);
router.put('/section/:sid/update', sectionsAdminController.updateSection);
router.delete('/section/:sid/delete', sectionsAdminController.deleteSection);


module.exports = router;