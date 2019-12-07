const chai = require("chai");
const { FULL_NODE_API } = require("../helpers/config");
const assertThrow = require("../helpers/assertThrow");
const earthWebBuilder = require("../helpers/earthWebBuilder");
const EarthWeb = earthWebBuilder.EarthWeb;
const GetNowBlock = require("../helpers/GetNowBlock");
const BlockLib = require("../helpers/BlockLib");
const jlog = require("../helpers/jlog");

const assert = chai.assert;

describe("EarthWeb.lib.plugin", async function() {
    let earthWeb;

    before(async function() {
        earthWeb = earthWebBuilder.createInstance();
    });

    describe("#constructor()", function() {
        it("should have been set a full instance in earthWeb", function() {
            assert.instanceOf(earthWeb.plugin, EarthWeb.Plugin);
        });
    });

    describe("#plug GetNowBlock into earthWeb.earth", async function() {
        it("should register the plugin GetNowBlock", async function() {
            const someParameter = "someValue";

            let result = earthWeb.plugin.register(GetNowBlock, {
                someParameter
            });
            assert.isTrue(result.skipped.includes("_parseToken"));
            assert.isTrue(result.plugged.includes("getCurrentBlock"));
            assert.isTrue(result.plugged.includes("getLatestBlock"));

            result = await earthWeb.earth.getCurrentBlock();
            assert.isTrue(result.fromPlugin);
            assert.equal(result.blockID.length, 64);
            assert.isTrue(/^00000/.test(result.blockID));

            result = await earthWeb.earth.getSomeParameter();
            assert.equal(result, someParameter);
        });
    });

    describe("#plug BlockLib into earthWeb at first level", async function() {
        it("should register the plugin and call a method using a promise", async function() {
            let result = earthWeb.plugin.register(BlockLib);
            assert.equal(result.libs[0], "BlockLib");
            result = await earthWeb.blockLib.getCurrent();
            assert.isTrue(result.fromPlugin);
            assert.equal(result.blockID.length, 64);
            assert.isTrue(/^00000/.test(result.blockID));
        });

        it("should register and call a method using callbacks", async function() {
            earthWeb.plugin.register(BlockLib);
            return new Promise(resolve => {
                earthWeb.blockLib.getCurrent((err, result) => {
                    assert.isTrue(result.fromPlugin);
                    assert.equal(result.blockID.length, 64);
                    assert.isTrue(/^00000/.test(result.blockID));
                    resolve();
                });
            });
        });

        it("should not register if earthWeb is instantiated with the disablePlugins option", async function() {
            let earthWeb2 = earthWebBuilder.createInstance({
                disablePlugins: true
            });
            let result = earthWeb2.plugin.register(BlockLib);
            assert.isTrue(typeof result.error === "string");
        });
    });
});
