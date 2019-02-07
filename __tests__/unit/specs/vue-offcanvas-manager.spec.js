/* eslint-disable */
// import { mount } from '@vue/test-utils'
import Vue from 'vue/dist/vue.min'
import VueOffcanvasManager from 'src'

const createRootElement = () => {
  const div = document.createElement('div')
  div.id = 'app-root'

  return div
};

Vue.use(VueOffcanvasManager)
const $el = createRootElement();
const vm = new Vue().$mount($el);

// TODO define test routines
test('Offcanvas manager store module gets installed correctly', () => {

});
