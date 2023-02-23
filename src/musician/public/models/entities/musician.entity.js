const ObjectId = require('mongodb').ObjectId;

class Musician {
    #_id
    #name
    #bestSong
    #votes

    static fromJSON(json) {
        return new Musician(json?._id, json.name, json.bestSong, json.votes);
    }
    
    /**
     * 
     * @param {ObjectId} id Defaults to a new ObjectId. 
     * @param {string} name 
     * @param {string} bestSong 
     * @param {number} votes Defaults to 0 
     */
    constructor(id = new ObjectId(), name, bestSong, votes = 0) {
        this.#_id = id;
        this.#name = name;
        this.#bestSong = bestSong;
        this.#votes = votes;
    }

    /**
     * 
     * @returns {string}
     */
    getId() { return this.#_id; }

    /**
     * 
     * @returns {string}
     */
    getName() { return this.#name; }

    /**
     * 
     * @returns {Musician} A copy of the Musician that this is invoked upon with
     * its number of votes incremented by 1.
     */
    upvote() {
        // NOTE: we're not modifying the state of the object that this method is called
        //       in context of. This is to preserve the immutability of objects since
        //       mutability is bad: https://hackernoon.com/mutability-leads-to-suffering-23671a0def6a
        return new Musician(this.#_id, this.#name, this.#bestSong, this.#votes + 1);
    }

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