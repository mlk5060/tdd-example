class MusicianRetrieveResult {
    #retrievedMusician

    /**
     * 
     * @param {Musician | undefined} retrievedMusician 
     */
    constructor(retrievedMusician) {
        this.#retrievedMusician = retrievedMusician;
    }

    /**
     * 
     * @returns {boolean} true if a musician was retrieved, false if not.
     */
    musicianWasRetrieved() {
        return this.#retrievedMusician !== undefined;
    }

    /**
     * 
     * @returns {Musician | undefined}
     */
    getRetrievedMusician() {
        return this.#retrievedMusician
    }
}

module.exports = MusicianRetrieveResult;