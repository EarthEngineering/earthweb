## What is EarthWeb?

EarthWeb aims to deliver a unified, seamless development experience influenced by Ethereum's [Web3](https://github.com/ethereum/web3.js/) implementation. We have taken the core ideas and expanded upon it to unlock the functionality of EARTH's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

## Compatibility

-   Version built for Node.js v6 and above
-   Version built for browsers with more than 0.25% market share

You can access either version specifically from the [dist](dist) folder.

EarthWeb is also compatible with frontend frameworks such as:

-   Angular
-   React
-   Vue.

You can also ship EarthWeb in a Chrome extension.

## Installation

### Node.js

```bash
npm install earthweb
```

or

```bash
yarn add earthweb
```

### Browser

First, don't use the release section of this repo, it has not updated in a long time.

Then easiest way to use EarthWeb in a browser is to install it as above and copy the dist file to your working folder. For example:

```
cp node_modules/earthweb/dist/EarthWeb.js ./js/earthweb.js
```

so that you can call it in your HTML page as

```
<script src="./js/earthweb.js"><script>
```

## Testnet

Ohio is the official EARTH testnet. To use it use the following endpoint:

```
https://ohio.earth.engineering
```

Get some Ohio EARTH at https://www.earth.engineering/ohio and play with it.
Anything you do should be explorable on https://explore.earth.engineering

## Your local private network for heavy testing

You can set up your own private network, running Earth Quickstart. To do it you must [install Docker](https://docs.docker.com/install/) and, when ready, run a command like

```bash
docker run -it --rm \
  -p 9090:9090 \
  -e "defaultBalance=100000" \
  -e "showQueryString=true" \
  -e "showBody=true" \
  -e "formatJson=true" \
  --name earth \
  earthengineering/quickstart
```

[More details about Earth Quickstart on GitHub](https://github.com/earthengineering/docker-earth-quickstart)

## Creating an Instance

First off, in your javascript file, define EarthWeb:

```js
const EarthWeb = require("earthweb");
```

When you instantiate EarthWeb you can define

-   fullNode
-   solidityNode
-   eventServer
-   privateKey

you can also set a

-   fullHost

which works as a jolly. If you do so, though, the more precise specification has priority.
Supposing you are using a server which provides everything, like EarthGrid, you can instantiate EarthWeb as:

```js
const earthWeb = new EarthWeb({
    fullHost: "https://rest.earth.engineering",
    privateKey: "your private key"
});
```

For retro-compatibility, though, you can continue to use the old approach, where any parameter is passed separately:

```js
const earthWeb = new EarthWeb(fullNode, solidityNode, eventServer, privateKey);
```

If you are, for example, using a server as full and solidity node, and another server for the events, you can set it as:

```js
const earthWeb = new EarthWeb({
    fullHost: "https://rest.earth.engineerin",
    eventServer: "https://api.someotherevent.io",
    privateKey: "your private key"
});
```

If you are using different servers for anything, you can do

```js
const earthWeb = new EarthWeb({
    fullNode: "https://some-node.tld",
    solidityNode: "https://some-other-node.tld",
    eventServer: "https://some-event-server.tld",
    privateKey: "your private key"
});
```

## A full example

The better way to understand how to work with Earth is to clone the [MetaCoin example](https://github.com/earthengineering/metacoin-box) and follow the instructions at
https://github.com/earthengineering/metacoin-box

## Contributions

In order to contribute you can

-   fork this repo and clone it locally
-   install the dependencies — `npm i`
-   do your changes to the code
-   build the EarthWeb dist files — `npm run build`
-   run a local private network using Earth Quickstart
-   run the tests — `npm test:node`
-   push your changes and open a pull request

```
Sending 10000 EARTH to TSyxYznQPFxb7G6s2DCmvXmHySrWAPDCk2
ADDRESS: TV2feciCxZAe8yCT7LxfF2TzYChQTbrcND
AMOUNT: 10000000000
method post
payload { to_address: '41d111e1cc76ce35c60e2e4e9da0037303c0e4e6a4',
  owner_address: '41928c9af0651632157ef27a2cf17ca72c575a4d21',
  amount: 10000000000 }
method post
payload { visible: false,
  txID:
   '4764d8aa5aafca6215bd40ee1feb327c8f4ab48e0efa88a5a70c2f0a967a02b2',
  raw_data:
   { contract: [ [Object] ],
     ref_block_bytes: '0001',
     ref_block_hash: '20b5c90055022198',
     expiration: 1575572361000,
     timestamp: 1575572302303 },
  raw_data_hex:
   '0a020001220820b5c9005502219840a89eb9bbed2d5a69080112650a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412340a1541928c9af0651632157ef27a2cf17ca72c575a4d21121541d111e1cc76ce35c60e2e4e9da0037303c0e4e6a41880c8afa02570dfd3b5bbed2d',
  signature:
   [ '7593b8e21d48423b53035e7cfe5279fca59d2ddee5fcea1d08cad92f4cdffde379a27c7c30ea1bfd5c3bcec4965c070a5c7351d74c609bb16bbd2a778293527700' ] }
```
