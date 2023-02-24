#!/usr/bin/env node

/**
 * Module dependencies.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..//..//.env') });
var connectDb = require('../helpers/database/database');
var catchError = require('../helpers/errors/catchErrors');
var app = require('../index');
var debug = require('debug')('crm:server');
var http = require('http');

const { NODE_ENV, MONGO_URI, PORT } = process.env;

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(PORT || 5050);

app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
    // connectDb(MONGO_URI);

    console.log(`[ Server⚡️] App Started on http://localhost:${port} - Environment : ${NODE_ENV} \n`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    catchError(error);
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

process.on('uncaughtException', (err) => {
    catchError(err);
});
process.on('unhandledRejection', (reason, promise) => {
    catchError(reason);
    promise.catch(catchError);
});

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
