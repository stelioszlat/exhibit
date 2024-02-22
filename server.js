const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const swagger = require('swagger-ui-express');

const { connect } = require('./src/db/connect');
const logger = require('./src/util/logger');
const apiLogger = require('./src/util/api-logger');
const error = require('./src/shared/error');
const fileStorage = require('./src/util/file-storage');
const swaggerConfig = require('./swagger.json');

dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const authRoutes = require('./src/routes/auth-routes');
const catalogRoutes = require('./src/routes/catalog-routes');
const exhibitRoutes = require('./src/routes/exhibit-routes');
const orderRoutes = require('./src/routes/order-routes');
const categoryRoutes = require('./src/routes/category-routes');
const vendorRoutes = require('./src/routes/vendor-routes');
const userRoutes = require('./src/routes/user-routes');

const app = express();
app.use(apiLogger);
// app.use(logger);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: fileStorage.imageStorage, fileFilter: fileStorage.imageFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/exhibit', exhibitRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/user', userRoutes);             // requires authentication
app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));
app.use(error.errorHandler);

connect(process.env.DB_HOST);
const server = app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
});

const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log('Client connected');
});

