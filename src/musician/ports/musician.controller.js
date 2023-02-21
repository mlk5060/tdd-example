const express = require('express');
const router = express.Router();
const Musician = require("../public/models/entities/musician.entity");

const MusicianService = require('../public/musician.service');

const musicianService = new MusicianService();

router.post('/', async (req, res) => {
	const result = await musicianService.create(Musician.fromJSON(req.body));
	result.respondViaHttp(res);
});

module.exports = router;
