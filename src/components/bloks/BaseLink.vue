<template>
  <component
    :is="isInternalLink ? 'router-link' : 'a'"
    :to="isInternalLink && `/${link.cached_url}`"
    :href="!isInternalLink && link.cached_url"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    isInternalLink() {
      if (!this.link.linktype) return true;
      return this.link.linktype === 'story';
    },
  },
};
</script>