const MusicianDto = require("../musician.dto");

class MusicianRetrieveResultFailedDto extends MusicianDto {

    constructor() {
        super(404);
    }

     /**
     * 
     * @returns {any} Structure is:
     * {
     *   errors: ["", "", ...]
     * }
     */
     getJsonHttpResponseBody() {
        return { errors: [ "Sorry, not on the list" ] };
    }
}

module.exports = MusicianRetrieveResultFailedDto