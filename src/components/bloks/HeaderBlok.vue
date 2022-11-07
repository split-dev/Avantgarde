<template>
  <div v-editable="blok">
    <h1 class="tw-text-red-500">{{ blok.title }}</h1>
    <img :src="blok.image.filename" :alt="blok.title">
    <i18n-link :to="blok.linkUrl.cached_url">{{ blok.linkLabel }}</i18n-link>
  </div>
</template>

<script>
const DEFAULT_BLOK = {
  title: 'Modify me!',
  subtitle: 'Change me as well!',
  buttons: [],
}
export default {
  props: {
    blok: {
      type: Object,
      default: () => ({ ...DEFAULT_BLOK }),
    },
  },
};
</script>
