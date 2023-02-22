const MusicianRepository = require("../private/musician.repository");
const MusicianCreateResultFailAlreadyExists = require("./models/value-objects/create-result/fail/musician.create-result.fail.already-exists");
const MusicianCreateResultSuccess = require("./models/value-objects/create-result/success/musician.create-result.success");

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
		const musicianQueryByNameResult = await this.#repository.getByName(musician);

		if (musicianQueryByNameResult.isFound()){
			return new MusicianCreateResultFailAlreadyExists();
		}

        const createdMusician = await this.#repository.create(musician)
		return new MusicianCreateResultSuccess(createdMusician);
	}
}

module.exports = MusicianService;
