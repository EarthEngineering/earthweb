import EarthWeb from "index";
import utils from "utils";
import semver from "semver";

export default class Plugin {
    constructor(earthWeb = false, options = {}) {
        if (!earthWeb || !earthWeb instanceof EarthWeb)
            throw new Error("Expected instance of EarthWeb");
        this.earthWeb = earthWeb;
        this.pluginNoOverride = ["register"];
        this.disablePlugins = options.disablePlugins;
    }

    register(Plugin, options) {
        let pluginInterface = {
            requires: "0.0.0",
            components: {}
        };
        let result = {
            libs: [],
            plugged: [],
            skipped: []
        };
        if (this.disablePlugins) {
            result.error = "This instance of EarthWeb has plugins disabled.";
            return result;
        }
        const plugin = new Plugin(this.earthWeb);
        if (utils.isFunction(plugin.pluginInterface)) {
            pluginInterface = plugin.pluginInterface(options);
        }
        if (semver.satisfies(EarthWeb.version, pluginInterface.requires)) {
            if (pluginInterface.fullClass) {
                // plug the entire class at the same level of earthWeb.earth
                let className = plugin.constructor.name;
                let classInstanceName =
                    className.substring(0, 1).toLowerCase() +
                    className.substring(1);
                if (className !== classInstanceName) {
                    EarthWeb[className] = Plugin;
                    this.earthWeb[classInstanceName] = plugin;
                    result.libs.push(className);
                }
            } else {
                // plug methods into a class, like earth
                for (let component in pluginInterface.components) {
                    if (!this.earthWeb.hasOwnProperty(component)) {
                        continue;
                    }
                    let methods = pluginInterface.components[component];
                    let pluginNoOverride =
                        this.earthWeb[component].pluginNoOverride || [];
                    for (let method in methods) {
                        if (
                            method === "constructor" ||
                            (this.earthWeb[component][method] &&
                                (pluginNoOverride.includes(method) || // blacklisted methods
                                    /^_/.test(method))) // private methods
                        ) {
                            result.skipped.push(method);
                            continue;
                        }
                        this.earthWeb[component][method] = methods[method].bind(
                            this.earthWeb[component]
                        );
                        result.plugged.push(method);
                    }
                }
            }
        } else {
            throw new Error(
                "The plugin is not compatible with this version of EarthWeb"
            );
        }
        return result;
    }
}
