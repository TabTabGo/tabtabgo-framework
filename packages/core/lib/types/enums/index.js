"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OrderDirection = require("./OrderDirection");

Object.keys(_OrderDirection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _OrderDirection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OrderDirection[key];
    }
  });
});