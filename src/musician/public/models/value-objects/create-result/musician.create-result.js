class MusicianCreateResult {
    #httpStatusCode

    /**
     * 
     * @param {int} httpStatusCode
     */
     constructor(httpStatusCode) {
        this.#httpStatusCode = httpStatusCode;
    }

    /**
     * 
     * @returns {int}
     */
    getHttpStatusCode() {
        return this.#httpStatusCode;
    }

    /**
     * 
     * @returns {any} Empty JSON by default.
     */
    getJsonHttpResponseBody() {
        return {};
    }
}

module.exports = MusicianCreateResult;