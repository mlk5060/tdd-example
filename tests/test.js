const Database = require ('../src/database')
const app = require('../src/app');
const supertest = require('supertest');

const server = supertest(app());
const input = { name: 'Van Halen', bestSong: "Why can't this be love?" };

afterEach(async () => {
	await clearDatabaseCollections();
})

afterAll(async () => {
	// We need to close the DB here rather than the global Jest teardown
	// otherwise it is `null` when this method is invoked in context of 
	// the global teardown
	return await Database.close();
});

describe('Musicians', () => {

	it('should return a 201 status code and an expected response body if the input supplied is valid', async () => {

		// When: we send input to create a resource on the server
		const response = await createMusicianOnServer(input)

		// Then: we should get a 201 status code
		expect(response.status).toEqual(201)

		// And: the response body should be as expected
		const responseBody = response.body
		expect(responseBody.name).toEqual(input.name)
		expect(responseBody.bestSong).toEqual(input.bestSong)
		expect(responseBody._id).toBeTruthy()
		expect(getAllKeysFromJson(responseBody).length).toEqual(3) // This helps to ensure we haven't missed any key values above!
	});

	it('should return a 409 status code and an expected response body if the same input is sent to the POST input twice', async () => {

		// Given: we create a resource on the server using the input defined
		await createMusicianOnServer(input)

		// When: we use this input to create a resource on the server again
		const response = await createMusicianOnServer(input)

		// Then: we should get a 409 status code
		expect(response.status).toEqual(409)

		// And: the response body should be as expected
		expect(response.body.errors).toEqual([ 'Hey, you checked in already!' ])
		expect(getAllKeysFromJson(response.body).length).toEqual(2) // This helps to ensure we haven't missed any keys in the response above! We expect `errors` and one array index.
	});

	it('should return a 200 status code and the musicians name/best song in the response body if a musician name is supplied and this artist has a best song saved on the server', async () => {
		
		// Given: we create a resource on the server using the input defined
		await createMusicianOnServer(input)

		// When: we query for the resource we created on the server via its name
		const response = await getMusicianByNameFromServer(input.name);

		// Then: we should get a 200 status code
		expect(response.status).toEqual(200)

		// And: the response body should be as expected
		const responseBody = response.body
		expect(responseBody.name).toEqual(input.name)
		expect(responseBody.bestSong).toEqual(input.bestSong)
		expect(responseBody._id).toBeTruthy()
		expect(getAllKeysFromJson(responseBody).length).toEqual(3) // This helps to ensure we haven't missed any key values above!
	});

	it('should return a 404 status code and an error message in the response body if a musician name is supplied and this artist does not have a best song saved on the server', async () => {
		
		// When: we query for the resource that hasn't been created on the server via its name
		const response = await getMusicianByNameFromServer(input.name);

		// Then: we should get a 404 status code
		expect(response.status).toEqual(404)

		// And: the response body should be as expected
		expect(response.body.errors).toEqual([ "Sorry, not on the list" ])
		expect(getAllKeysFromJson(response.body).length).toEqual(2) // This helps to ensure we haven't missed any keys in the response above! We expect `errors` and one array index.
	});
});

const clearDatabaseCollections = async () => {
	const database = await Database.get();
	await database.dropDatabase();
};

const getAllKeysFromJson = (json, keys = []) => {
	for (const key of Object.keys(json)) {
		keys.push(key);
		if (typeof json[key] == 'object') {
			getAllKeysFromJson(json[key], keys);
		}
	}
	return keys;
};

const createMusicianOnServer = async (input) => {
	return await server.post('/api/v1/musicians').send(input)
}

const getMusicianByNameFromServer = async (musicianName) => {
	return await server.get(`/api/v1/musicians?name=${musicianName}`)
}
