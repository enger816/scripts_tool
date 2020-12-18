require("weapp-adapter.js");
require("./libs/min/laya.qqmini.min.js");
requirePlugin("layaPlugin/laya.core.js");
requirePlugin("layaPlugin/laya.d3.js");
requirePlugin("layaPlugin/laya.ui.js");

window.loadLib = require;
require("./index.js");