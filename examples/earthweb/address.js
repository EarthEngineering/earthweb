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

    let hex = await earthweb.address.toHex(
        "TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg"
    );
    console.log(hex);

    let address = earthweb.address.fromHex(hex);
    console.log(address);

    let addy = earthweb.address.fromPrivateKey(
        "45edc3696ce916a9d9993d820b3d6f92b37f7637d841c5475ea80645be59e3bf"
    );
    console.log(addy);
}

// make sure to call main() to start the dapp
main();
