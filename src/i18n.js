import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dateTimeFormats from "@/locales/date-time-formats"

import { useStoryblokApi } from '@storyblok/vue-2'

Vue.use(VueI18n);

const loadedLanguages = [];

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {},
  dateTimeFormats,
});

export async function loadLocaleMessages(locale) {
  if (loadedLanguages.length && i18n.locale === locale
    || loadedLanguages.includes(locale)) return Promise.resolve(locale);

  const storyBlokApi = useStoryblokApi();
  const translations = {};

  const { data } = await storyBlokApi
    .get(`cdn/datasource_entries?datasource=translations&dimension=${locale}`, {
    version: process.env.NODE_ENV !== 'production' ? 'draft' : 'published',
  });

  data?.datasource_entries.forEach((entry) => {
    translations[entry.name] = entry.dimension_value || entry.value;
  });

  i18n.setLocaleMessage(locale, translations);
  loadedLanguages.push(locale);
  return Promise.resolve(locale);
}

export default i18n;
