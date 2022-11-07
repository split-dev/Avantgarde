<!-- 
    Used on: 
    ImageBlocksSection, ServicesView

    Props:
    alignment: bottom (default) / top
 -->
<template>
    <div>
        <div class="image-blocks__item position-relative z-stack">
        <div class="image-blocks__item__inner d-flex flex-column justify-end h-100 absolute-fill"
             :class="alignment === 'bottom' ? '' : 'justify-md-start'"
        >
            <v-img
            class="absolute-fill z-behind"
            :src="img_src"
            :alt="img_alt"
            />
            <h2 class="image-blocks__item__heading text-white" v-if="title" v-html="title"></h2>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ImageBlock",
  props: {
    img_src: {
        type: String,
        required: true
    },
    img_alt: {
        type: String
    },
    title: {
        type: String
    },
    alignment: {
        type: String,
        default: 'bottom'
    }
  }
}
</script>

<style lang="scss">
@import "./src/assets/styles/variables";

.image-blocks {
  &__item {
    padding-bottom: 100%;
    @media (min-width: $media-sm) {
      padding-bottom: 192%; 
    }
    &__inner {
      padding: 19px 16px;
      @media (min-width: $media-sm) {
        padding: 50px 32px;
      }
    }
    &__heading {
      font-size: 35px;
      line-height: 45px;
      @media (min-width: $media-sm) {
        font-size: 45px;
        line-height: 50px;
      }
    }
  }
}
</style>
