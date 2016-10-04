# Larry

Meet Larry. He's a bit simple, but he's good at following instructions.

## Usage

```
npm install
npm start
```

## Example Config

```js
/* larry.config.js */

const path = require('path');

module.exports = {
  copy: {
    src: path.join(__dirname, 'test/overrides'),
    dst: path.join(__dirname, 'test/app/overrides')
  },
  cmds: {
    before: function before() {
      return 'mkdir tars';
    },
    afterEach: function after(dir) {
      var name = path.parse(dir).name;
      return 'tar -cf tars/' + name + '.tar -C test app';
    }
  }
};

```

## Planned features
- Provide a web interface for management/configuration of the above
