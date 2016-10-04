/* eslint-disable */

const path = require('path');

module.exports = {
  copy: {
    src: path.join(__dirname, 'example/overrides'),
    dst: path.join(__dirname, 'example/app/overrides')
  },
  cmds: {
    before: function before() {
      return 'echo "mkdir tars"';
    },
    afterEach: function after(dir) {
      var name = path.parse(dir).name;
      return 'echo "tar -cf tars/' + name + '.tar -C example app"';
    }
  }
};
