module.exports = async () => {
	const { teardownDatabaseContainer } = require('../external-dependencies/database/test-database');
	await teardownDatabaseContainer();
};