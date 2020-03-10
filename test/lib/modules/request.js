"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = request;

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _window = window,
    fetch = _window.fetch;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  var status = response.status;

  if (status >= 200 && status < 300) {
    return response;
  }

  if (status === 999) {
    return response.json().then(function (data) {
      var _window2 = window,
          location = _window2.location;
      location.href = data.data + '/login?goto=' + encodeURIComponent(location.href);
    });
  }

  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} [alertError] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */


function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var alertError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var newOptions = formatOptions(options);
  return fetch(url, newOptions).then(checkStatus).then(parseJSON)["catch"](function () {
    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var message = error.message ? error.message : error;
    return {
      code: error.code || 500,
      message: message || '连接服务器失败！'
    };
  }).then(function (json) {
    if (!isSuccess(json) && alertError) {
      _message2["default"].error(json.message);
    }

    return isSuccess(json) ? Promise.resolve(json.data) : Promise.reject(json);
  });
}

function isSuccess(data) {
  return data.code === 0;
}

function formatOptions(options) {
  var body = options.body;

  if (body && !(body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
    options.headers = _objectSpread({}, options.headers, {
      'content-type': 'application/json'
    });
  }

  return options;
}