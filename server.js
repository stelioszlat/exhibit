const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const { connect } = require('./src/db/connect');
const config = require('./config.json');
const logger = require('./src/util/logger');
const apiLogger = require('./src/util/api-logger');
const error = require('./src/shared/error');
const fileStorage = require('./src/util/file-storage');

const host = config.host;
const port = config.port;

const exhibitRoutes = require('./src/routes/exhibit-routes');
const sectionRoutes = require('./src/routes/section-routes');
const museumRoutes = require('./src/routes/museum-routes');
const adminRoutes = require('./src/routes/admin-routes');

const app = express();
app.use(apiLogger);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: fileStorage.imageStorage, fileFilter: fileStorage.imageFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use('/exhibits', exhibitRoutes);
app.use('/sections', sectionRoutes);
app.use('/museums', museumRoutes);
app.use('/admin', adminRoutes);             // requires authentication
app.use(error.errorHandler);

connect(config.db);
app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
});

