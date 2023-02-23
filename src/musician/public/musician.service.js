const MusicianRepository = require("../private/repositories/musician.repository");
const MusicianCreateResultFailAlreadyExistsDto = require("./models/value-objects/dto/create-result/musician.create-result.fail.already-exists");
const MusicianCreateResultSuccessDto = require("./models/value-objects/dto/create-result/musician.create-result.success");
const MusicianRetrieveResultFailedDto = require("./models/value-objects/dto/retrieve-result/musician.retrieve-result.fail");
const MusicianRetrieveResultSuccessDto = require("./models/value-objects/dto/retrieve-result/musician.retrieve-result.success");
const MusicianUpdateResultSuccessDto = require("./models/value-objects/dto/update-result/musician.update-result.success");

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

	/**
	 * 
	 * @param {string} musicianName 
	 * @returns {Promise<MusicianDto>}
	 */
	async retrieveByName(musicianName) {
		const retrieveMusicianResult = await this.#repository.retrieveByName(musicianName);
		
		if (retrieveMusicianResult.musicianWasRetrieved()){
			return new MusicianRetrieveResultSuccessDto(retrieveMusicianResult.getRetrievedMusician());
		}
		
		return new MusicianRetrieveResultFailedDto();
	}

	/**
	 * 
	 * @param {string} musicianId 
	 * @returns {Promise<MusicianDto>}
	 */
	async upvoteMusician(musicianId) {
		const retrieveMusicianResult = await this.#repository.retrieveById(musicianId);

		if (retrieveMusicianResult.musicianWasRetrieved()) {
			const upvotedMusician = retrieveMusicianResult.getRetrievedMusician().upvote();
			const updateResult = await this.#repository.update(upvotedMusician);
			return new MusicianUpdateResultSuccessDto(updateResult.getUpdatedMusician());
		}

		return new MusicianRetrieveResultFailedDto();
	}
}

module.exports = MusicianService;
