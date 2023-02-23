const ObjectId = require('mongodb').ObjectId;

const Database = require("../../../database");
const Musician = require('../../public/models/entities/musician.entity');

const MusicianRetrieveResult = require('./value-objects/musician.retrieve-result');
const MusicianCreateResult = require ('./value-objects/musician.create-result');
const MusicianUpdateResult = require('./value-objects/musician.update-result');

class MusicianRepository {

    static #collectionName = 'musicians';

    /**
     * 
     * @param {string} musicianName
     * @returns {Promise<MusicianRetrieveResult>}
     */
    async retrieveByName(musicianName) {
        const collection = await this.#getCollection();
        const result = await collection.findOne({ name: musicianName })
        
        if (result === null) return new MusicianRetrieveResult(undefined);
        return new MusicianRetrieveResult(Musician.fromJSON(result));
    }

    /**
     * 
     * @param {string} musicianId
     * @returns {Promise<MusicianRetrieveResult>}
     */
     async retrieveById(musicianId) {
        const collection = await this.#getCollection();

        let result = null;

        // This is terrible UX from Mongo. Why not simply return `null` if the input is
        // invalid? Instead, the cognitive load of handling valid ObjectId's is passed
        // to the MongoDB caller *smh*. This should really trigger the creation of a new 
        // test to check what happens if a valid ObjectId inputs are supplied, but I refuse
        // to couple the application so tightly to MongoDB!
        if (ObjectId.isValid(musicianId)) {
            result = await collection.findOne({ _id: new ObjectId(musicianId) })
        }

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
     * @param {Musician} musician The updated Musician to commit to the data layer 
     * @returns {Promise<MusicianUpdateResult}
     */
    async update(musician) {
        const collection = await this.#getCollection();
        const musicianObjectId = new ObjectId(musician.getId());

        // I've opted to use `replaceOne() for ease here. Using `updateOne()` forces you down
        // the path of specifying fields in the Musician entity/document. Therefore, any time
        // the entity changes, this method would need to be modifyied which effectively couples
        // them to each other. Implementing the update in this way keeps coupling between the
        // Musician entity and document version to a minimum.
        await collection.replaceOne({ _id: musicianObjectId }, musician.toJSON());
        const updatedMusicianJson = await collection.findOne({ _id: musicianObjectId })
        return new MusicianUpdateResult(Musician.fromJSON(updatedMusicianJson));
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