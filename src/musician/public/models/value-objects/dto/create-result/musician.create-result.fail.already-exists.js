const MusicianDto = require("../musician.dto");

class MusicianCreateResultFailAlreadyExistsDto extends MusicianDto {

    static #errorMessages = { errors: [ 'Hey, you checked in already!' ] }

    constructor() {
        super(409);
    }

    /**
     * 
     * @returns {any} Structure is:
     * {
     *   errors: ["", "", ...]
     * }
     */
     getJsonHttpResponseBody(){
        return MusicianCreateResultFailAlreadyExistsDto.#errorMessages;
    }
}

module.exports = MusicianCreateResultFailAlreadyExistsDto;