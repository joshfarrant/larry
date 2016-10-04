'use strict';

var _io = require('./modules/io');

var _larry = require('../larry.config');

var _larry2 = _interopRequireDefault(_larry);

require('colors');

var _betterConsole = require('better-console');

var _betterConsole2 = _interopRequireDefault(_betterConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_betterConsole2.default.log('\nHello, Larry!\n'.rainbow);

var _config$copy = _larry2.default.copy;
var src = _config$copy.src;
var dst = _config$copy.dst;
var _config$cmds = _larry2.default.cmds;
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

  /**
   * Builds an array of functions, each of which
   * returns a promise. The promise copies the
   * files to the destination, runs the afterEach
   * command, then moves on to the next function
   */
  var funcs = dirs.map(function (dir) {
    return function () {
      return (0, _io.copy)(dir, dst).then(function () {
        return (0, _io.exec)(afterEach(dir));
      }).catch(function (err) {
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
  _betterConsole2.default.log('\nLarry\'s all done!!!'.bold.green);
}).catch(function (err) {
  _betterConsole2.default.log('err: ', err);
});