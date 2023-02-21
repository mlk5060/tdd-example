module.exports = async () => {
	const { createDatabaseContainer } = require('../external-dependencies/database/test-database');
	await createDatabaseContainer();
};