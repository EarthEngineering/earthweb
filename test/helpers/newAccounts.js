const earthWebBuilder = require("./earthWebBuilder");
const earthWeb = earthWebBuilder.createInstance();

const amount = process.argv[2] || 10;

(async function() {
    await earthWebBuilder.newTestAccounts(amount);
})();
