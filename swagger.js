const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Exhibit API',
        description: ''
    },
    host: 'localhost:8080',
    basePath: '',
    schemes: ['http']
};

const outputFile = './swagger-output.json'
const endpointFiles = [
    './src/routes/user-routes.js',
    './src/routes/catalog-routes.js',
    './src/routes/category-routes.js',
    './src/routes/exhibit-routes.js',
    './src/routes/vendor-routes.js',
];

swaggerAutogen(outputFile, endpointFiles, doc);