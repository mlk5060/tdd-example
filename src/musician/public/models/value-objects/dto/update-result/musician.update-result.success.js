const MusicianDto = require("../musician.dto");

class MusicianUpdateResultSuccessDto extends MusicianDto {

    #updatedMusician;

    /**
     * 
     * @param {Musician} updatedMusician 
     */
    constructor(updatedMusician) {
        super(200);
        this.#updatedMusician = updatedMusician;
    }

    /**
     * 
     * @returns {any} The updated musician as JSON.
     */
    getJsonHttpResponseBody(){
        return this.#updatedMusician.toJSON();
    }
}

module.exports = MusicianUpdateResultSuccessDto;