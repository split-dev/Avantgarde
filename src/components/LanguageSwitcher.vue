<template>
  <div class="language-switcher">
    <router-link
      v-for="(locale, idx) in locales"
      :key="locale.code"
      :to="{
        name: $route.name,
        query: $route.query,
        params: { locale: locale.code }
      }"
      :class="{ 'active': locale.code === $i18n.locale }"
      class="
        tw-uppercase
        tw-text-[22px]
        tw-font-medium
      "
    >
      <span class="tw-text-[#fff]">
        {{ locale.code }}
        <span v-if="idx !== locales.length -1">|</span>
      </span>
    </router-link>
  </div>
</template>

<script>
import { getSupportedLocales } from '@/utils/i18n-supported-locales';

export default {
  name: 'LangaugeSwitcher',

  data: () => ({
    locales: getSupportedLocales(),
  }),
};
</script>