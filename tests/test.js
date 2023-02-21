const Database = require ('../src/database')
const app = require('../src/app');
const supertest = require('supertest');

const server = supertest(app());

afterAll(async () => {
	// We need to close the DB here rather than the global Jest teardown
	// otherwise it is `null` when this method is invoked in context of 
	// the global teardown
	return await Database.close();
});

describe('Musicians', () => {

	it.only('should return a 200 status code and an expected response body if the input supplied is valid', async () => {

		// Given: a valid input
		const input = { name: 'Van Halen', bestSong: "Why can't this be love?" };

		// When: we send this input to the POST endpoint
		const response = await server.post('/api/v1/musicians').send(input)

		// Then: we should get a 201 status code
		expect(response.status).toEqual(201)

		// And: the response body should be as expected
		const responseBody = response.body
		expect(responseBody.name).toEqual(input.name)
		expect(responseBody.bestSong).toEqual(input.bestSong)
		expect(responseBody._id).toBeTruthy()
		expect(getAllKeysFromJson(responseBody).length).toEqual(3) // This helps to ensure we haven't missed any key values above!
	});

	it.only('should return a 409 status code and an expected response body if the same input is sent to the POST input twice', async () => {

		// Given: a new valid resource is sent to the POST endpoint
		const input = { name: 'clipping.', bestSong: 'Nothing is Safe' };
		await server.post('/api/v1/musicians').send(input)

		// When: we send this input to the POST endpoint again
		const response = await server.post('/api/v1/musicians').send(input)

		// Then: we should get a 409 status code
		expect(response.status).toEqual(409)

		// And: the response body should be as expected
		expect(response.body.errors).toEqual([ 'Hey, you checked in already!' ])
		expect(getAllKeysFromJson(response.body).length).toEqual(2) // This helps to ensure we haven't missed any keys in the response above! We expect `errors` and one array index.
	});
});


const getAllKeysFromJson = (json, keys = []) => {
	for (const key of Object.keys(json)) {
		keys.push(key);
		if (typeof json[key] == 'object') {
			getAllKeysFromJson(json[key], keys);
		}
	}
	return keys;
};
