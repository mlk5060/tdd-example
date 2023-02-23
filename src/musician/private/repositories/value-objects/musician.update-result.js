class MusicianUpdateResult {
    #updatedMusician

    /**
     * 
     * @param {Musician} updatedMusician 
     */
    constructor(updatedMusician) {
        this.#updatedMusician = updatedMusician;
    }

    /**
     * 
     * @returns {Musician}
     */
    getUpdatedMusician() {
        return this.#updatedMusician
    }
}

module.exports = MusicianUpdateResult;