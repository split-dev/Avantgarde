<template>
  <section :class="`
    page-section d-flex
    ${className || ''}
    ${theme ? `theme--${theme}` : ''}
    ${(typeof verticalTitle === 'undefined' || aboveLine) ? 'above-line' : ''}
    ${addTopLine ? 'tw-border-t tw-border-[#B5B5B5]' : ''}
  `">
    <VerticalTextBlock v-if="showVerticalTtitle" :text="verticalTitle" />
    <v-container v-if="container" fluid :class="`${containerClassName} ${contentCenter ? 'd-flex': ''}`">
      <v-row no-gutters class="flex-fill h-100 w-100" :class="rowClassName">
        <slot/>
      </v-row>
    </v-container>
    <div v-else>
      <v-row no-gutters class="flex-fill h-100 w-100" :class="rowClassName">
        <slot/>
      </v-row>
    </div>
  </section>
</template>

<script>
import VerticalTextBlock from "@/components/bloks/VerticalTextBlock";

export default {
  name: "SectionPrototype",
  components: {
    VerticalTextBlock,
  },
  props: {
    className: {
      type: String
    },
    rowClassName: {
      type: String,
      optional: true
    },
    containerClassName: {
      type: String
    },
    verticalTitle: {
      type: String
    },
    aboveLine: {
      type: Boolean
    },
    contentCenter: {
      type: Boolean
    },
    addTopLine: {
      type: Boolean
    },
    theme: {
      type: String
    },
    container: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    showVerticalTtitle() {
      return typeof this.verticalTitle !== 'undefined'
        && this.verticalTitle !== null;
    },
  },
}
</script>

<style lang="scss">
@import "../assets/styles/variables";
  .page-section {
    position: relative;
    z-index: 1;
    .container {
      overflow: hidden; /* need to hide Swipers extra spaces */
      padding-right: 0;
      padding-left: 0;
    }
    &.above-line {
      z-index: 2;
    }
  }
</style>
