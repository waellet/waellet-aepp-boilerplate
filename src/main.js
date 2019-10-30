/* eslint-disable */
/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';


/* ============
 * Code highlighting
 * ============
 *
 * Import the hljs code highlighting plugin.
 */

import hljs from 'highlight.js';

// import VueHighLightJs from 'vue-highlightjs';

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 */

import './plugins/vuex';
import './plugins/axios';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/bootstrap';
import './plugins/font-awesome';
import './plugins/register-service-worker';

/* ============
 * Styling
 * ============
 *
 * Import the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Import the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */

import './assets/stylus/app.styl';

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

store.dispatch('auth/check');

Vue.directive('highlightjs', {
  deep: true,
  bind(el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  componentUpdated(el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  },
});

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App),
});
