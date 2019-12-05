const assert = require("chai").assert;
const earthWebBuilder = require("./earthWebBuilder");

module.exports = async function(result, string) {
    assert.equal(
        result,
        earthWebBuilder
            .getInstance()
            .toHex(string)
            .substring(2)
    );
};
