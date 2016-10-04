'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  copy: {
    src: _path2.default.join(__dirname, 'test/src'),
    dst: _path2.default.join(__dirname, 'test/dst')
  }
};