import Vue from 'vue';
import { StoryblokVue, apiPlugin } from '@storyblok/vue-2';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import i18n from './i18n'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import * as utilities from '@/utils/methods';

import './assets/styles/main.scss';

Vue.use(VueI18n);

import I18nLink from "@/components/I18n-Link";

Vue.component('I18nLink', I18nLink);

Vue.use(VueI18n);

const requireContext = require.context(
  './components/bloks',
  false,
  /.*\.vue$/,
);

const bloks = requireContext.keys()
  .map(file => [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)])
  .reduce((components, [name, component]) => {
    components[name] = component.default;
    return components;
  }, {});

Vue.config.productionTip = false;

Vue.use(StoryblokVue, {
  accessToken: process.env.VUE_APP_SB_TOKEN,
  bridge: process.env.NODE_ENV !== 'production',
  use: [apiPlugin],
});

Object.keys(bloks).forEach(name => Vue.component(name, bloks[name]));

// Global Mixin
Vue.mixin({
  methods: { ...utilities },
  computed: {
    storyOptions() {
      return {
        language: this.$i18n.locale,
        version: process.env.NODE_ENV !== 'production' ? 'draft' : 'published',
      };
    },
  },
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app');
