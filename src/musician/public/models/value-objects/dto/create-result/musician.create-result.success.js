const MusicianDto = require("../musician.dto");

class MusicianCreateResultSuccessDto extends MusicianDto {

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

module.exports = MusicianCreateResultSuccessDto;