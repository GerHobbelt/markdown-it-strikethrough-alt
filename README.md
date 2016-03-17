# markdown-it-strikethrough-alt

[![Build Status](https://img.shields.io/travis/jay-hodgson/markdown-it-strikethrough-alt/master.svg?style=flat)](https://travis-ci.org/jay-hodgson/markdown-it-strikethrough-alt)
[![NPM version](https://img.shields.io/npm/v/markdown-it-strikethrough-alt.svg?style=flat)](https://www.npmjs.org/package/markdown-it-strikethrough-alt)
[![Coverage Status](https://img.shields.io/coveralls/jay-hodgson/markdown-it-strikethrough-alt/master.svg?style=flat)](https://coveralls.io/r/jay-hodgson/markdown-it-strikethrough-alt?branch=master)

> Alternative syntax strikethrough (`<s>`) tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

`--Strikeout--` => `<s>Strikeout</s>`

## Install

node.js, browser:

```bash
npm install markdown-it-strikethrough-alt --save
bower install markdown-it-strikethrough-alt --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-strikethrough-alt'));

md.render('--Strikeout--') // => '<s>Strikeout</s>'
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitStrikethroughAlt`.


## License

[MIT](https://github.com/markdown-it/markdown-it-strikethrough-alt/blob/master/LICENSE)
