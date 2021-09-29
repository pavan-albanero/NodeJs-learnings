const log4js = require('log4js'); // include log4js
require('dotenv').config();

const getLogger = log4js.configure({ // configure to use all types in different files.
    appenders: {
        app: { type: 'file', filename: "../logs/app.log" }
    },
    categories: {
        
        default: { appenders: ["app"], level: "info" }
        }
});

const logger = log4js.getLogger('app');
module.exports =logger;




