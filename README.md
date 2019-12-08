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
