var MongoClient = require('mongodb').MongoClient;
const logger = require("./logger");

/**
 * A singleton connection to the underlying database.
 * 
 * We don't want to open multiple database connections!
 */
var Database = (function () {
    var db = null;
    var client = null;

    return {
        get: async function () {
            try{
                if (db != null) {
                    logger.debug(`db connection is already alive`);
                    return db;
                } else {
                    logger.debug(`getting new db connection`);
                    client = await MongoClient.connect(process.env.NODEJS_TEST_APP_DB_URL);
                    try {
                        await client.db("admin").command({ ping: 1 });
                        logger.info("Connected successfully to MongoDB server");
                        db = client.db()
                    } catch (e) {
                        logger.error(e);
                    }
                    return db; 
                }
            } catch (e) {
                return e;
            }
        },
        close: async function () {
            logger.debug("Closing MongoDB connection");
            await client.close();
        }

    }
})();

module.exports = Database;