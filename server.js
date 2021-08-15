const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { connect } = require('./db/connect');

const exhibitRoutes = require('./routes/exhibit-routes');
const sectionRoutes = require('./routes/section-routes');
const museumRoutes = require('./routes/museum-routes');
const adminRoutes = require('./routes/admin-routes');
const errorRoutes = require('./routes/error-routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/exhibits', exhibitRoutes);
app.use('/sections', sectionRoutes);
app.use('/museums', museumRoutes);
app.use('/admin', adminRoutes);
app.use(errorRoutes);

connect('mongodb://localhost:27017/metadata');
app.listen(8080);

