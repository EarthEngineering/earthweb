const chai = require("chai");
const { ADDRESS_HEX, ADDRESS_BASE58 } = require("../helpers/config");
const earthWebBuilder = require("../helpers/earthWebBuilder");

const assert = chai.assert;

describe("EarthWeb.utils.accounts", function() {
    describe("#generateAccount()", function() {
        it("should generate a new account", async function() {
            const earthWeb = earthWebBuilder.createInstance();

            const newAccount = await earthWeb.utils.accounts.generateAccount();
            assert.equal(newAccount.privateKey.length, 64);
            assert.equal(newAccount.publicKey.length, 130);
            let address = earthWeb.address.fromPrivateKey(
                newAccount.privateKey
            );
            assert.equal(address, newAccount.address.base58);

            assert.equal(
                earthWeb.address.toHex(address),
                newAccount.address.hex.toLowerCase()
            );
        });
    });
});
