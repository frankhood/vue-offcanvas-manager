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

The plugin provides a custom directive, `v-offcanvas`, that can be used to define offcanvas elements in templates

```vue
<template>
  <div v-offcanvas:oc-name="options">
    <p>Offcanvas content</p>
  </div>
</template>
```

where `options` is an object literal containing settings for the offcanvas, such as its position, animation, etc.

### Offcanvas options

The configuration object allows to override default offcanvas settings for each instantiated offcanvas. The following table contains all available options with their default value, that is applied if no value is provided

Option          | Description                    | Default
----------------|--------------------------------|----------
`position`      | Offcanvas position on screen   | 'top'
`openAnimation`      | Opening animation          | 'fade-in'
`closeAnimation`      | Closing animation          | 'fade-out'
`duration`      | Animation duration (in ms)          | 500
`lockScroll`      | If true, locks the window scroll when the offcanvas is open. Useful for screen replacers. | false

### Animation hooks

Several JavaScript hooks are provided in the animation cycle. The callbacks, provided in the offcanvas configuration object as well, are called in the `Vue` instance scope, so that `this` will be bound to the Vue VM where the offcanvas is instantiated.

Hook | Description
-----|-------------
`beforeEnter` | Called before the enter animation starts
`afterEnter` | Called after the enter animation is completed
`beforeLeave` | Called before the leave animation starts
`afterLeave` | Called after the leave animation is completed
`beforeStateChange` | Called after the enter/leave animations end but before the opening state change is triggered on the offcanvas object

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
