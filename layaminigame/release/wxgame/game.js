require("weapp-adapter.js");
requirePlugin("layaPlugin/laya.core.min.js");
requirePlugin("layaPlugin/laya.wxmini.min.js");
requirePlugin("layaPlugin/laya.webgl.min.js");
requirePlugin("layaPlugin/laya.ui.min.js");
requirePlugin("layaPlugin/laya.tiledmap.min.js");
requirePlugin("layaPlugin/laya.particle.min.js");
requirePlugin("layaPlugin/laya.html.min.js");
requirePlugin("layaPlugin/laya.filter.min.js");
requirePlugin("layaPlugin/laya.ani.min.js");

window.loadLib = require;
require("./libs.js");
require("./code.js");