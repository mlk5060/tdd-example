const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const Musician = require("../public/models/entities/musician.entity");

const MusicianService = require('../public/musician.service');

const musicianService = new MusicianService();

router.post('/', async (req, res) => {
	const result = await musicianService.create(Musician.fromJSON(req.body));
	res.status(result.getHttpStatusCode()).send(result.getJsonHttpResponseBody());
});

router.get('/', async (req, res) => {
	const result = await musicianService.retrieveByName(req.query.name);
	res.status(result.getHttpStatusCode()).send(result.getJsonHttpResponseBody());
});

router.put('/:musicianId/votes', async (req, res) => {
	const result = await musicianService.upvoteMusician();
	res.status(result.getHttpStatusCode()).send(result.getJsonHttpResponseBody());
});

module.exports = router;
