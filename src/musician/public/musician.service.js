const MusicianRepository = require("../private/repositories/musician.repository");
const MusicianCreateResultFailAlreadyExistsDto = require("./models/value-objects/dto/create-result/musician.create-result.fail.already-exists");
const MusicianCreateResultSuccessDto = require("./models/value-objects/dto/create-result/musician.create-result.success");
const MusicianRetrieveResultFailedDto = require("./models/value-objects/dto/retrieve-result/musician.retrieve-result.fail");
const MusicianRetrieveResultSuccessDto = require("./models/value-objects/dto/retrieve-result/musician.retrieve-result.success");

class MusicianService {

	#repository

	constructor() {
		this.#repository = new MusicianRepository();
	}

	/**
	 *
	 * @param {Musician} 
	 * @returns {Promise<MusicianDto>}
	 */
	async create(musician) {
		const retrieveMusicianResult = await this.#repository.retrieveByName(musician.getName());

		if (retrieveMusicianResult.musicianWasRetrieved()){
			return new MusicianCreateResultFailAlreadyExistsDto();
		}

        const createMusicianResult = await this.#repository.create(musician)
		return new MusicianCreateResultSuccessDto(createMusicianResult.getCreatedMusician());
	}

	async retrieveByName(musicianName) {
		const retrieveMusicianResult = await this.#repository.retrieveByName(musicianName);
		
		if (retrieveMusicianResult.musicianWasRetrieved()){
			return new MusicianRetrieveResultSuccessDto(retrieveMusicianResult.getRetrievedMusician());
		}
		
		return new MusicianRetrieveResultFailedDto();
	}
}

module.exports = MusicianService;
