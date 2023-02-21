const MusicianCreateResult = require("../public/models/value-objects/musician.create-result")

class MusicianCreateResultFactory {

    /**
     * 
     * @returns {MusicianCreateResult}
     */
    static failsDueToMusicianAlreadyExisting() {
        return new MusicianCreateResult(409, { errors: [ 'Hey, you checked in already!' ] })
    }

    /**
     * 
     * @param {Musician} createdMusician
     * @returns {MusicianCreateResult}
     */
    static success(createdMusician) {
        return new MusicianCreateResult(201, createdMusician.toJSON())
    }
}

module.exports = MusicianCreateResultFactory