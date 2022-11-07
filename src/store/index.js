import Vue from 'vue'
import Vuex from 'vuex'
import { useStoryblok, useStoryblokApi } from '@storyblok/vue-2'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: {},
    layout: {},
  },
  getters: {
    homePageContent(state) {
      return state.page.home;
    },
    thoughtPageContent(state) {
      return state.page.thought;
    }
  },
  mutations: {
    setHomePage(state, page) {
      state.page.home = page;
    },
    setThoughtPage(state, page) {
      state.page.thought = page;
    },
    setLayout(state, layout) {
      state.layout = layout;
    }
  },
  actions: {
    async fetchLayout(store, language){
      const layout = await useStoryblok('layout',
      {
        language: language,
        version: process.env.NODE_ENV !== 'production' ? 'draft' : 'published',
        resolve_relations: ['Layout.article_loader'],
      },
      {
        resolveRelations: ['Layout.article_loader'],
      });

      store.commit('setLayout', layout);
    },

    async fetchPages(store) {
      const storyBlokApi = useStoryblokApi();
      const homePageUrl = '/cdn/stories/home';
      const thoughtPageUrl = '/cdn/stories/thought';
      const homePage = await axios.get(
        `https://api2.storyblok.com/v2${homePageUrl}`,
        {
          params: storyBlokApi.factoryParamOptions(homePageUrl, {version: "published"})
        });

      const thoughtPage = await axios.get(
        `https://api2.storyblok.com/v2${thoughtPageUrl}`,
        {
          params: storyBlokApi.factoryParamOptions(homePageUrl, {version: "published"})
        });

      store.commit('setHomePage', homePage.data);
      store.commit('setThoughtPage', thoughtPage.data);

      return store.state.page;
    }
  },
  modules: {
  }
})
