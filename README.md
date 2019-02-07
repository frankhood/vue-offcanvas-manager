# Vue offcanvas manager

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Vue spellbook to make panels appear and disappear wherever you want

## Installation

```bash
npm install --save https://github.com/frankhood/vue-offcanvas-manager.git#master
```

## Usage

Import `vue-offcanvas-manager` in your JS entry point and install it via `Vue.use()`

```js
import Vue from 'vue'
import VueOffcanvasManager from 'vue-offcanvas-manager'

Vue.use(VueOffcanvasManager)
```

You can also override default options when installing it

```js
Vue.use(VueOffcanvasManager, {
  option: '...'
})
```

TODO: explain how the plugin works

## Development

### Launch webpack dev server

```bash
npm run dev
```

### Launch tests with Jest

Launch the `test` command, which will perform linting beforehand

```bash
npm run test
```

### Build

Launch the `build` command, which will output a minified bundle in the `dist` folder

```bash
npm run build
```

## Publishing

TODO

## License

[BSD](https://opensource.org/licenses/BSD-3-Clause)