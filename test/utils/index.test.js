const chai = require("chai");
const earthWebBuilder = require("../helpers/earthWebBuilder");
const EarthWeb = earthWebBuilder.EarthWeb;
const BigNumber = require("bignumber.js");

const assert = chai.assert;

describe("EarthWeb.utils", function() {
    describe("#isValidURL()", function() {
        it("should verify good urls", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(
                earthWeb.utils.isValidURL(
                    "https://some.example.com:9090/casa?qe=3"
                )
            );
            assert.isTrue(earthWeb.utils.isValidURL("www.example.com/welcome"));

            assert.isFalse(earthWeb.utils.isValidURL("http:/some.example.com"));

            assert.isFalse(earthWeb.utils.isValidURL(["http://example.com"]));
        });
    });

    describe("#isArray()", function() {
        it("should verify that a value is an array", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.isArray([]));
            assert.isTrue(earthWeb.utils.isArray([[2], { a: 3 }]));

            assert.isFalse(earthWeb.utils.isArray({}));
            assert.isFalse(earthWeb.utils.isArray("Array"));
        });
    });

    describe("#isJson()", function() {
        it("should verify that a value is a JSON string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.isJson("[]"));
            assert.isTrue(earthWeb.utils.isJson('{"key":"value"}'));
            assert.isTrue(earthWeb.utils.isJson('"json"'));

            assert.isFalse(earthWeb.utils.isJson({}));
            assert.isFalse(earthWeb.utils.isJson("json"));
        });
    });

    describe("#isBoolean()", function() {
        it("should verify that a value is a JSON string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.isBoolean(true));
            assert.isTrue(earthWeb.utils.isBoolean("a" == []));

            assert.isFalse(earthWeb.utils.isBoolean({}));
            assert.isFalse(earthWeb.utils.isBoolean("json"));
        });
    });

    describe("#isBigNumber()", function() {
        it("should verify that a value is a JSON string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            const bigNumber = BigNumber("1234565432123456778765434456777");

            assert.isTrue(earthWeb.utils.isBigNumber(bigNumber));

            assert.isFalse(
                earthWeb.utils.isBigNumber(
                    "0x09e80f665949b63b39f3850127eb29b55267306b69e2104c41c882e076524a1c"
                )
            );
            assert.isFalse(earthWeb.utils.isBigNumber({}));
            assert.isFalse(earthWeb.utils.isBigNumber("json"));
        });
    });

    describe("#isString()", function() {
        it("should verify that a valyue is a string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.isString("str"));
            assert.isTrue(earthWeb.utils.isString((13).toString()));

            assert.isFalse(earthWeb.utils.isString(2));
        });
    });

    describe("#isFunction()", function() {
        it("should verify that a value is a function", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.isFunction(new Function()));
            assert.isTrue(earthWeb.utils.isFunction(() => {}));
            assert.isTrue(earthWeb.utils.isFunction(earthWeb.utils.isFunction));

            assert.isFalse(
                earthWeb.utils.isFunction({ function: new Function() })
            );
        });
    });

    describe("#isHex()", function() {
        it("should verify that a string is an hex string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            let input = "0x1";
            let expected = true;
            assert.equal(earthWeb.utils.isHex(input), expected);

            input = "0x0";
            expected = true;
            assert.equal(earthWeb.utils.isHex(input), expected);

            input = "0x73616c616d6f6e";
            expected = true;
            assert.equal(earthWeb.utils.isHex(input), expected);

            input = "73616c616d6f";
            expected = true;
            assert.equal(earthWeb.utils.isHex(input), expected);

            input = "0x73616c616d6fsz";
            expected = false;
            assert.equal(earthWeb.utils.isHex(input), expected);

            input = "x898989";
            expected = false;
            assert.equal(earthWeb.utils.isHex(input), expected);
        });
    });

    describe("#isInteger()", function() {
        it("should verify that a value is an integer", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.isInteger(2345434));
            assert.isTrue(earthWeb.utils.isInteger(-234e4));

            assert.isFalse(earthWeb.utils.isInteger(3.4));
            assert.isFalse(earthWeb.utils.isInteger("integer"));
        });
    });

    describe("#hasProperty()", function() {
        it("should verify that an object has a specific property", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(earthWeb.utils.hasProperty({ p: 2 }, "p"));
            assert.isFalse(earthWeb.utils.hasProperty([{ p: 2 }], "p"));

            assert.isFalse(earthWeb.utils.hasProperty({ a: 2 }, "p"));
        });
    });

    describe("#hasProperties()", function() {
        it("should verify that an object has some specific properties", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.isTrue(
                earthWeb.utils.hasProperties({ p: 2, s: 2 }, "p", "s")
            );

            assert.isFalse(
                earthWeb.utils.hasProperties({ p: 2, s: 2 }, "p", "q")
            );
        });
    });

    describe("#mapEvent()", function() {
        it("should map an event result", function() {
            const earthWeb = earthWebBuilder.createInstance();

            const event = {
                block_number: "blockNumber",
                block_timestamp: "blockTimestamp",
                contract_address: "contractAddress",
                event_name: "eventName",
                transaction_id: "transactionId",
                result: "result",
                resource_Node: "resourceNode"
            };

            const expected = {
                block: "blockNumber",
                timestamp: "blockTimestamp",
                contract: "contractAddress",
                name: "eventName",
                transaction: "transactionId",
                result: "result",
                resourceNode: "resourceNode"
            };

            const mapped = earthWeb.utils.mapEvent(event);
            for (let key in mapped) {
                assert.equal(mapped[key], expected[key]);
            }
        });
    });

    describe("#parseEvent", function() {
        // TODO
    });

    describe("#padLeft()", function() {
        it("should return the pad left of a string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            assert.equal(
                earthWeb.utils.padLeft("09e80f", "0", 12),
                "00000009e80f"
            );
            // assert.equal(earthWeb.utils.padLeft(new Function, '0', 32), '0000000function anonymous() {\n\n}');
            assert.equal(
                earthWeb.utils.padLeft(3.4e3, "0", 12),
                "000000003400"
            );
        });
    });

    describe("#ethersUtils()", function() {
        it("should import sha256 from ethers and has a string", function() {
            const earthWeb = earthWebBuilder.createInstance();

            const string = "0x" + Buffer.from("some string").toString("hex");
            const hash = earthWeb.utils.ethersUtils.sha256(string);

            assert.equal(
                hash,
                "0x61d034473102d7dac305902770471fd50f4c5b26f6831a56dd90b5184b3c30fc"
            );
        });
    });
});
