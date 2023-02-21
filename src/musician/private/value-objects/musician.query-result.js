class MusicianQueryResult {
    #found

    constructor(found) {
        this.#found = found;
    }

    isFound() {
        return this.#found;
    }
}

module.exports = MusicianQueryResult;