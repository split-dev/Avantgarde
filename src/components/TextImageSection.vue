<template>
  <SectionPrototype verticalTitle="" :theme="theme" contentCenter className="text-image-section" :rowClassName="reverseImage ? 'flex-row-reverse' : ''" containerClassName="text-image-section-container" :aboveLine="aboveLine">
    <v-col class="d-flex flex-column justify-start align-start" cols="12" lg="7">
      <h1 :class="`title-${titleType}`">{{title}}</h1>
      <v-img eager v-if="mobileReplaceImage" class="d-block d-md-none" :src="image"></v-img>
      <p class="body-pre-text">
        {{description}}

        <span v-if="linkLabel" class="d-block 2-100 pt-md-16 mt-10 mt-lg-16 pr-lg-16 text-center text-md-right">
          <i18n-link :to="linkUrl" class="arrow-link text-decoration-none py-5">{{linkLabel}}</i18n-link>
        </span>
      </p>
    </v-col>
    <v-col cols="12" lg="5">
      <v-img eager :src="image" :class="mobileReplaceImage ? 'd-none d-md-block' : ''"></v-img>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';

export default {
  name: "TextImageSection",
  props: {
    theme: {
      type: String
    },
    aboveLine: {
      type: Boolean
    },
    title: {
      type: String
    },
    titleType: {
      type: String,
      default: 'h1'
    },
    description: {
      type: String
    },
    reverseImage: {
      type: Boolean,
      default: false
    },
    image: {
      type: String
    },
    mobileReplaceImage: {
      type: Boolean
    },
    linkLabel: {
      type: String,
      optional: true
    },
    linkUrl: {
      type: String,
      optional: true
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({
  })
}
</script>

<style lang="scss">
  @import "../assets/styles/variables";

  .text-image-section {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    &-container {
      padding: 0 0;
      max-width: calc(100% - 160px);
      @media (min-width: $media-md) {
        .row {
          flex-wrap: nowrap;
        }
      }
      @media (max-width: $media-sm) {
        max-width: calc(100% - 60px);
      }
    }
    .title-h1,
    .title-h2,
    .title-h3 {
      padding-left: 56px;
      padding-right: 120px;
      padding-top: 108px;
      margin-bottom: 36px;
      @media (max-width: $media-sm) {
        padding: 43px 0 0 43px;
        margin-bottom: 13px;
      }
    }
    p {
      padding-left: 121px;
      padding-right: 155px;
      margin-bottom: 0;
      line-height: 1;
      padding-bottom: 240px;
      @media (max-width: $media-sm) {
        padding: 0 37px 184px 43px;
      }
    }
    .v-image {
      width: auto;
      max-width: 814px;
      align-self: stretch;
      height: 100%;
      margin: 0 0 0 auto;
      @media (max-width: $media-md) {
        height: 467px;
        width: 100%;
        max-width: 100%;
        margin: 34px 0 51px 0;
      }
    }
  }
  .description--shortened {
    &.text-image-section p {
      @media (max-width: $media-sm) {
        padding-bottom: 40px;
      }
    }
  }
</style>
