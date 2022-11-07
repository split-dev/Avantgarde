<template>
  <SectionPrototype :theme="theme" contentCenter className="rich-text" containerClassName="rich-text-container">
    <div class="rich-text-slot" v-html="content"></div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';
import {renderRichText} from "@storyblok/vue-2";

export default {
  name: "RichTextSection",
  props: {
    theme: {
      type: String
    },
    text: {
      type: Object
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({
    content: null
  }),
  mounted() {
    this.generateContent(this.text);
  },
  methods: {
    generateContent(richText) {
      this.content = renderRichText(richText);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .rich-text {
    font-size: 24px;
    line-height: 34px;
    color: black;
    ::v-deep &-container {
      padding: 63px 416px 100px 416px;
      @media (max-width: 1440px) {
        padding: 63px 140px 100px 140px;
      }
      @media (max-width: $media-sm) {
        padding: 30px 36px 106px 36px;
      }
    }
    ::v-deep p:last-child {
      margin-bottom: 0;
    }
    ::v-deep h2 {
      color: $dark-text;
      font-size: 65px;
      line-height: 75px;
      margin-top: 0;
      margin-bottom: 38px;
      max-width: 690px;
      @media (max-width: $media-sm) {
        font-size: 45px;
        line-height: 50px;
        margin-bottom: 14px;
      }
    }
    @media (max-width: $media-sm) {
      font-size: 18px;
      line-height: 22px;
    }
  }
</style>
