<template>
  <SectionPrototype :theme="theme" contentCenter className="big-img" containerClassName="big-img-container">
    <v-img eager :src="src" min-height="236"/>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';

export default {
  name: "BigImageSection",
  props: {
    theme: {
      type: String
    },
    src: {
      type: String
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .big-img {
    ::v-deep &-container {
      padding: 74px 140px 58px 140px;
      @media (max-width: $media-sm) {
        padding: 40px 36px 0 36px;
      }
    }
  }
</style>
