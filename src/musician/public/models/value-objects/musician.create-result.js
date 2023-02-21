class MusicianCreateResult {

    #serverResponseCode
    #body

    /**
     * 
     * @param {int} serverResponseCode 
     * @param {any} body 
     */
    constructor(serverResponseCode, body) {
        this.#serverResponseCode = serverResponseCode;
        this.#body = body;
    }

    /**
     * 
     * @param {Response<any, Record<string, any>, number>} res 
     */
    respondViaHttp(res) {
        res.status(this.#serverResponseCode).send(this.#body)
    }
}

module.exports = MusicianCreateResult;