const MusicianCreateResultFactory = require("../private/musician.create-result.factory");
const MusicianRepository = require("../private/musician.repository");

class MusicianService {

	#repository

	constructor() {
		this.#repository = new MusicianRepository();
	}

	/**
	 *
	 * @param {Musician} 
	 * @returns {Promise<MusicianCreateResult>}
	 */
	async create(musician) {
		const musicianQueryByNameResult = await this.#repository.retrieveByName(musician);

		if (musicianQueryByNameResult.isFound()){
			return MusicianCreateResultFactory.failsDueToMusicianAlreadyExisting();
		}

        const createdMusician = await this.#repository.create(musician)
		return MusicianCreateResultFactory.success(createdMusician);
	}
}

module.exports = MusicianService;
