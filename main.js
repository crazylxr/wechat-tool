require("babel-core/register");
require("./index.js");
require("babel-core").transform("code", {
    plugins: ["transform-runtime"]
});