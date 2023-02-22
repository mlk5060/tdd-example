const MusicianCreateResult = require("../musician.create-result");

class MusicianCreateResultSuccess extends MusicianCreateResult {

    #createdMusician;

    /**
     * 
     * @param {Musician} createdMusician 
     */
    constructor(createdMusician) {
        super(201);
        this.#createdMusician = createdMusician;
    }

    /**
     * 
     * @returns {any} The created musician as JSON.
     */
    getJsonHttpResponseBody(){
        return this.#createdMusician.toJSON();
    }
}

module.exports = MusicianCreateResultSuccess;