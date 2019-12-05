const injectPromise = require("injectpromise");

class BlockLib {
    constructor(earthWeb = false) {
        if (!earthWeb)
            throw new Error("Expected instances of EarthWeb and utils");
        this.earthWeb = earthWeb;
        this.injectPromise = injectPromise(this);
    }

    async getCurrent(callback = false) {
        if (!callback) return this.injectPromise(this.getCurrent);

        this.earthWeb.fullNode
            .request("wallet/getnowblock")
            .then(block => {
                block.fromPlugin = true;
                callback(null, block);
            })
            .catch(err => callback(err));
    }

    pluginInterface() {
        return {
            requires: "^2.8.0",
            fullClass: true
        };
    }
}

module.exports = BlockLib;
