<template>
  <component
    :is="component"
    :href="href"
    :to="routerTo"
    :target="target"
  >
    <slot />
  </component>
</template>

<script>
import { isLocaleSupported } from '@/utils/i18n-supported-locales'

export default {
  name: 'I18nLink',

  props: {
    to: {
      type: [String, Object],
    },
  },
  computed: {
    isExternal() {
      return /^(http:\/\/|https:\/\/|mail:|tel:)+/.test(this.to);
    },
    // storyblok link field urls are already localized
    localizedPath() {
      if (!this.to) return;
      if (typeof this.to !== 'string') return this.to;
      const lang = (this.to.split('/').filter(Boolean) || [])[0];
      return isLocaleSupported(lang)
        ? this.to
        : `/${this.$i18n.locale}${this.to.startsWith('/') ? this.to : `/${this.to}`}`;
    },
    routerTo() {
      if (this.isExternal || !this.localizedPath) return null;
      return `/${this.localizedPath.replace(/^\/|\/$/g, '')}`
    },
    href() {
      return this.isExternal ? this.to : null;
    },
    target() {
      return this.isExternal ? '_blank' : '_self';
    },
    component() {
      return this.isExternal ? 'a' : 'router-link';
    },
  },
}
</script>