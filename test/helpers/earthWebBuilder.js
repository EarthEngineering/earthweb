const chalk = require("chalk");
const EarthWeb = require("../setup/EarthWeb");
const jlog = require("./jlog");

const {
    FULL_NODE_API,
    SOLIDITY_NODE_API,
    EVENT_API,
    PRIVATE_KEY
} = require("./config");

const createInstance = (extraOptions = {}) => {
    let options = Object.assign(
        {
            fullHost: FULL_NODE_API,
            privateKey: PRIVATE_KEY
        },
        extraOptions
    );
    return new EarthWeb(options);
};

let instance;

const getInstance = () => {
    if (!instance) {
        instance = createInstance();
    }
    return instance;
};

const newTestAccounts = async amount => {
    const earthWeb = createInstance();

    console.log(earthWeb);
    console.log(chalk.blue(`Generating ${amount} new accounts...`));
    await earthWeb.fullNode.request(
        "/admin/temporary-accounts-generation?accounts=" + amount
    );
    const lastCreated = await getTestAccounts(-1);
    jlog(lastCreated.b58);
};

const getTestAccounts = async block => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    };
    const earthWeb = createInstance();
    const accountsJson = await earthWeb.fullNode.request(
        "/admin/accounts-json"
    );
    const index =
        typeof block === "number"
            ? block > -1 && block < accountsJson.more.length
                ? block
                : accountsJson.more.length - 1
            : undefined;
    accounts.pks =
        typeof block === "number"
            ? accountsJson.more[index].privateKeys
            : accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = earthWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(earthWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);
};

module.exports = {
    createInstance,
    getInstance,
    newTestAccounts,
    getTestAccounts,
    EarthWeb
};
