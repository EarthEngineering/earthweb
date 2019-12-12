// create an async main function to leverage await below
async function main() {
    // require earthweb
    let EarthWeb = require("../../dist/EarthWeb.node.js");
    let fullNodePrivateKey =
        "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";

    // instantiate EarthWeb
    const earthweb = await new EarthWeb({
        fullHost: "http://127.0.0.1:9090",
        solidityHost: "http://127.0.0.1:9090",
        eventServer: "http://127.0.0.1:9090",
        privateKey: fullNodePrivateKey
    });

    let isConnected = await earthweb.isConnected();

    console.log(isConnected);
}

// make sure to call main() to start the dapp
main();
