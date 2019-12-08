const fs = require("fs");
const path = require("path");
const dest = path.resolve(__dirname, "..", "test", "setup", "EarthWeb.js");
const src = path.resolve(__dirname, "..", "test", "setup", "browser.js");

try {
    fs.unlinkSync(dest);
} catch (ex) {}

fs.copyFileSync(src, dest);
