const express = require('express');
const bodyParser = require('body-parser');
const pinoExpress = require('express-pino-logger');
const logger = require('./logger');
const musicianController = require('./musician/ports/musician.controller');

function app() {
    return express()
        .use(bodyParser.json())
        .use(pinoExpress({logger}))
        .use(
            '/api/v1/musicians',
            musicianController
        )
    ;
}

module.exports = app;
