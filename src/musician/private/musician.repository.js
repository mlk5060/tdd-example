const ObjectId = require('mongodb').ObjectId;

const Database = require("../../database");
const Musician = require ('../public/models/entities/musician.entity');
const MusicianQueryResult = require('./value-objects/musician.query-result') 

class MusicianRepository {

    static #collectionName = 'musicians';

    /**
     * 
     * @param {Musician} musician 
     * @returns {Promise<MusicianQueryResult>}
     */
    async getByName(musician) {
        const collection = await this.#getCollection();
        const result = await collection.findOne({ name: musician.getName() })
        
        if (result === null) return new MusicianQueryResult(false);
        return new MusicianQueryResult(true);
    }

    /**
     * 
     * @param {Musician} musician 
     * @returns {Promise<Musician>}
     */
    async create(musician) {
        const collection = await this.#getCollection();
        const insertResult = await collection.insertOne(musician.toJSON())
        const createdMusicianJson = await collection.findOne({ _id: new ObjectId(insertResult.insertedId) })
        return Musician.fromJSON(createdMusicianJson);
    }

    /**
     * 
     * @returns {Promise<Collection>} See https://mongodb.github.io/node-mongodb-native/5.0/classes/Collection.html
     */
    async #getCollection() {
        const database = await Database.get()
        return await database.collection(MusicianRepository.#collectionName);
    }
}

module.exports = MusicianRepository;