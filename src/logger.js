const pino = require('pino');

module.exports = pino({
	level: process.env.NODEJS_TDD_APP_LOGGER_LEVEL || "debug"
});