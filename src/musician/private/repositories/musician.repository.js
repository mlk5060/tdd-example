const ObjectId = require('mongodb').ObjectId;

const Database = require("../../../database");
const Musician = require('../../public/models/entities/musician.entity');

const MusicianRetrieveResult = require('./value-objects/musician.retrieve-result');
const MusicianCreateResult = require ('./value-objects/musician.create-result');

class MusicianRepository {

    static #collectionName = 'musicians';

    /**
     * 
     * @param {Musician} musician 
     * @returns {Promise<MusicianRetrieveResult | undefined>}
     */
    async retrieveByName(musicianName) {
        const collection = await this.#getCollection();
        const result = await collection.findOne({ name: musicianName })
        
        if (result === null) return new MusicianRetrieveResult(undefined);
        return new MusicianRetrieveResult(Musician.fromJSON(result));
    }

    /**
     * 
     * @param {Musician} musician 
     * @returns {Promise<MusicianCreateResult>}
     */
    async create(musician) {
        const collection = await this.#getCollection();
        const insertResult = await collection.insertOne(musician.toJSON())
        const createdMusicianJson = await collection.findOne({ _id: new ObjectId(insertResult.insertedId) })
        return new MusicianCreateResult(Musician.fromJSON(createdMusicianJson));
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