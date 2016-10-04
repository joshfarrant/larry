/* eslint-disable */

const path = require('path');

module.exports = {
  copy: {
    src: path.join(__dirname, 'example/overrides'),
    dst: path.join(__dirname, 'example/app/overrides')
  },
  cmds: {
    before: function before() {
      return 'mkdir tars';
    },
    afterEach: function after(dir) {
      var name = path.parse(dir).name;
      return 'tar -cf tars/' + name + '.tar -C example app';
    }
  }
};
