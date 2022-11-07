<template>
  <SectionPrototype :theme="theme" contentCenter className="quote-text" containerClassName="quote-text-container">
    <div class="d-flex flex-column flex-md-row">
      <div class="quote-title">Zitat</div>
      <div class="quote-text-slot" v-html="text"></div>
    </div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';

export default {
  name: "QuoteSection",
  props: {
    theme: {
      type: String
    },
    text: {
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

.quote-text {
  font-size: 24px;
  line-height: 34px;
  color: black;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  ::v-deep &-container {
    margin-top: 45px;
    padding: 71px 416px 132px 416px;
    @media (max-width: 1440px) {
      padding: 71px 140px 132px 140px;
    }
    @media (max-width: $media-sm) {
      margin-top: 0;
      padding: 35px 36px 81px 36px;
    }
  }
  ::v-deep .quote-title {
    margin-top: 9px;
    @media (max-width: $media-sm) {
      margin-top: 0;
      margin-bottom: 19px;
    }
  }
  ::v-deep .quote-text-slot {
    padding-left: 80px;
    color: $dark-text;
    font-size: 65px;
    line-height: 80px;
    margin-top: 0;
    margin-bottom: 0;
    @media (max-width: $media-sm) {
      font-size: 35px;
      line-height: 40px;
      padding-left: 0;
      margin-bottom: 0;
    }
  }
  @media (max-width: $media-sm) {}
}
</style>
