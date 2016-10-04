'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exec = exports.getDirs = exports.copy = undefined;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

require('colors');

var _betterConsole = require('better-console');

var _betterConsole2 = _interopRequireDefault(_betterConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copy = exports.copy = function copy(src, dst) {

  _betterConsole2.default.log(('Copying ' + src + ' -> ' + dst).grey);

  return new Promise(function (resolve, reject) {

    _fsExtra2.default.copy(src, dst, {
      clobber: true
    }, function (err) {

      if (err) {
        reject(err);
      } else {
        _betterConsole2.default.log(('Copied  ' + src + ' -> ' + dst).cyan);
        resolve();
      }
    });
  });
};

var getDirs = exports.getDirs = function getDirs(dirPath) {

  return new Promise(function (resolve, reject) {

    _fsExtra2.default.readdir(dirPath, function (err, files) {

      if (err) {
        reject(err);
      } else {
        var dirs = files.map(function (f) {
          return _path2.default.join(dirPath, f);
        }).filter(function (f) {
          return _fsExtra2.default.lstatSync(f).isDirectory();
        });
        resolve(dirs || []);
      }
    });
  });
};

var exec = exports.exec = function exec(cmd) {

  _betterConsole2.default.log(('Started  ' + cmd).grey);

  return new Promise(function (resolve, reject) {

    _child_process2.default.exec(cmd, function (err, stdout) {

      if (err) {
        reject(err);
      } else {
        _betterConsole2.default.log(('Finished ' + cmd).cyan);
        resolve(stdout);
      }
    });
  });
};