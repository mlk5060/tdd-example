const { GenericContainer, Wait } = require('testcontainers');

let startedContainer;

const createDatabaseContainer = async () => {
	startedContainer = await new GenericContainer('mongo')
		.withName('nodejs-tdd-it-mongodb')
		.withExposedPorts(27017)
		.withWaitStrategy(Wait.forLogMessage('Waiting for connections'))
		.start();

	process.env.NODEJS_TEST_APP_DB_URL = `mongodb://localhost:${startedContainer.getMappedPort(27017)}/test`; // GOTTA BE CAREFUL WITH THE PORTS!!
};

const teardownDatabaseContainer = async () => {
	if (startedContainer) {
		await startedContainer.stop();
	}
};

module.exports = {
	createDatabaseContainer,
	teardownDatabaseContainer
};