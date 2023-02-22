class MusicianCreateResult {
    #createdMusician

    /**
     * 
     * @param {Musician} createdMusician 
     */
    constructor(createdMusician) {
        this.#createdMusician = createdMusician;
    }

    /**
     * 
     * @returns {Musician}
     */
    getCreatedMusician() {
        return this.#createdMusician
    }
}

module.exports = MusicianCreateResult;