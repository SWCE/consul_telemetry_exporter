const winston = require( 'winston' );
const fs = require('fs');
const path = require('path');
const logDir = process.env.LOGS_DIR || path.join(__dirname, 'logs');
const env = process.env.NODE_ENV || 'development';

winston.setLevels( winston.config.npm.levels );
winston.addColors( winston.config.npm.colors );

if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}
const logger = new( winston.Logger )( {
    transports: [
        new winston.transports.Console( {
            level: 'debug',
            colorize: true,
            prettyPrint: true,
            timestamp: true
        } ),
        new winston.transports.File( {
            level: env === 'development' ? 'debug' : 'info',
            filename: path.join(logDir, 'consul_telemetry_exporter.log'),
            maxsize: 1024 * 1024 * 10, // 10MB,
            maxFiles : 3,
            prettyPrint: true,
            timestamp: true,
            json : false
        } )
    ],
    exceptionHandlers: [
        new winston.transports.File( {
            filename: path.join(logDir, 'exceptions.log'),
            prettyPrint: true,
            timestamp: true,
            json : false
        } )
    ],
    exitOnError: false
} );

module.exports = logger;