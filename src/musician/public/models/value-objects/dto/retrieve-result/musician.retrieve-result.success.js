const MusicianDto = require("../musician.dto");

class MusicianRetrieveResultSuccessDto extends MusicianDto {

    #retrievedMusician;

    /**
     * 
     * @param {Musician} retrievedMusician 
     */
    constructor(retrievedMusician) {
        super(200);
        this.#retrievedMusician = retrievedMusician;
    }

    /**
     * 
     * @returns {any} The retrieved musician as JSON.
     */
    getJsonHttpResponseBody(){
        return this.#retrievedMusician.toJSON();
    }
}

module.exports = MusicianRetrieveResultSuccessDto;