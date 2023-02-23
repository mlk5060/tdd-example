const ObjectId = require('mongodb').ObjectId;

class Musician {
    #_id
    #name
    #bestSong
    #votes

    static fromJSON(json) {
        return new Musician(json?._id, json.name, json.bestSong);
    }
    
    constructor(id = new ObjectId(), name, bestSong) {
        this.#_id = id;
        this.#name = name;
        this.#bestSong = bestSong;
        this.#votes = 0;
    }

    getName() { return this.#name; }

    toJSON() {
        return {
            _id: this.#_id,
            name: this.#name,
            bestSong: this.#bestSong,
            votes: this.#votes
        };
    }
}

module.exports = Musician;