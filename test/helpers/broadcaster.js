const earthWebBuilder = require("../helpers/earthWebBuilder");

module.exports = async function(func, pk, transaction) {
    const earthWeb = earthWebBuilder.createInstance();
    if (!transaction) {
        transaction = await func;
    }
    const signedTransaction = await earthWeb.earth.sign(transaction, pk);
    const result = {
        transaction,
        signedTransaction,
        receipt: await earthWeb.earth.sendRawTransaction(signedTransaction)
    };
    return Promise.resolve(result);
};
