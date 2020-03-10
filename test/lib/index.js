"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "history", {
  enumerable: true,
  get: function get() {
    return _history2["default"];
  }
});
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function get() {
    return _request2["default"];
  }
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function get() {
    return _reactRedux.connect;
  }
});
exports.dispatch = void 0;

var _store = require("./modules/store");

var _history2 = _interopRequireDefault(require("./modules/history"));

var _request2 = _interopRequireDefault(require("./modules/request"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dispatch = (0, _store.getDispatch)();
exports.dispatch = dispatch;