const MusicianCreateResult = require("../musician.create-result");

class MusicianCreateResultFailAlreadyExists extends MusicianCreateResult {

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
        return MusicianCreateResultFailAlreadyExists.#errorMessages;
    }
}

module.exports = MusicianCreateResultFailAlreadyExists;