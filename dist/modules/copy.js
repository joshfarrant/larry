'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var copy = function copy(src, dst) {

  return new Promise(function (resolve, reject) {

    _fsExtra2.default.copy(src, dst, {
      clobber: true
    }, function (err) {

      if (err) {
        reject(err);
      } else {
        console.log(src + ' -> ' + dst);
        resolve();
      }
    });
  });
};

exports.default = copy;