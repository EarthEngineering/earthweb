let someParameter;

class GetNowBlock {
    constructor(earthWeb = false) {
        if (!earthWeb) throw new Error("Expected instance of EarthWeb");

        this.earthWeb = earthWeb;
    }

    async someMethod(callback = false) {
        if (!callback) return this.injectPromise(this.getCurrentBlock);

        this.earthWeb.fullNode
            .request("wallet/getnowblock")
            .then(block => {
                block.fromPlugin = true;
                callback(null, block);
            })
            .catch(err => callback(err));
    }

    getSomeParameter() {
        return someParameter;
    }

    pluginInterface(options) {
        if (options.someParameter) {
            someParameter = options.someParameter;
        }
        return {
            requires: "^2.2.4",
            components: {
                earth: {
                    // will be overridden
                    getCurrentBlock: this.someMethod,

                    // will be added
                    getLatestBlock: this.someMethod,
                    getSomeParameter: this.getSomeParameter,

                    // will be skipped
                    _parseToken: function() {}
                }
            }
        };
    }
}

module.exports = GetNowBlock;
