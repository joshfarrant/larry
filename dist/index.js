'use strict';

var _io = require('./modules/io');

var _config = require('./modules/config');

var _config2 = _interopRequireDefault(_config);

require('colors');

var _betterConsole = require('better-console');

var _betterConsole2 = _interopRequireDefault(_betterConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_betterConsole2.default.log('\nHello, Larry!\n'.rainbow);

var src = _config2.default.src;
var _config$cmds = _config2.default.cmds;
var after = _config$cmds.after;
var afterEach = _config$cmds.afterEach;
var before = _config$cmds.before;

/**
 * The magic chain of promises that
 * gets shit done!
 */

var runBefore = function runBefore() {

  return new Promise(function (resolve) {
    if (typeof before !== 'function') {
      resolve();
    } else {
      resolve((0, _io.exec)(before()));
    }
  });
};

runBefore().then(function () {
  return (0, _io.getDirs)(src);
}).then(function (dirs) {

  var funcs = dirs.map(function (dir) {
    return function () {
      return (0, _io.exec)(afterEach(dir)).catch(function (err) {
        return _betterConsole2.default.log(err);
      });
    };
  });

  /**
   * A clever way to run the promise-returning
   * functions using array.reduce essentially
   * creating a chain of promises, eg:
   * p3.then(p2.then(p1.then(Promise.resolve())))
   */
  return funcs.reduce(function (p, fn) {
    return p.then(fn);
  }, Promise.resolve());
}).then(function () {
  return (0, _io.exec)(after());
}).then(function () {
  _betterConsole2.default.log('\nLarry\'s all done!!!'.bold.green);
}).catch(function (err) {
  _betterConsole2.default.log('err: ', err);
});