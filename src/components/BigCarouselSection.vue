<template>
  <SectionPrototype className="big-carousel-blocks" verticalTitle="" :theme="theme">
    <CarouselBlock
      :identifier="`${removeSpaces(title, '-')}-carousel`"
      :gap="$vuetify.breakpoint.mobile ? 20 : 122"
      :slot-items-count="blocks?.length"
      type="custom"
    >
      <div class="swiper-slide" v-for="photo in blocks" :key="photo.key">
        <v-img :src="photo.image" max-width="100%" cover eager></v-img>
        <p class="body-pre-text" v-if="photo.content">{{photo.content}}</p>
      </div>
    </CarouselBlock>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import CarouselBlock from '../components/bloks/CarouselBlock';

export default {
  name: "BigCarouselSection",
  props: {
    title: {
      type: String
    },
    theme: {
      type: String
    },
    blocks: {
      type: Array
    }
  },
  components: {
    SectionPrototype,
    CarouselBlock
  },
  data: () => ({
  }),
}
</script>


<style lang="scss">
  @import "../assets/styles/variables";

  .big-carousel-blocks {
    padding-bottom: 170px;
    .container {
      max-width: calc(100% - 160px);
      padding: 0;
    }
    .flex-fill.h-100 {
      height: auto !important;
    }
    .paging-label {
      position: absolute;
      left: 120px;
      top: 956px;
    }
    .swiper {
      padding-right: 21vw;
    }
    .swiper-wrapper {
      padding: 100px 0 0 120px;
      box-sizing: border-box;
    }
    .swiper-slide {
      max-width: 71vw;
      width: 71vw;
      .v-image {
        height: 817px;
        max-height: 817px;
        width: 76%;
      }
      p {
        opacity: 0;
        transition: opacity ease-in-out 500ms;
        width: 100%;
        padding: 77px 0 0 277px;
      }
      &-active {
        p {
          opacity: 1;
        }
      }
    }

    @media (max-width: $media-sm) {
      .container {
        max-width: calc(100% - 60px);
      }
      .swiper-wrapper {
        padding-top: 93px;
        padding-left: 43px;
        padding-bottom: 184px;
      }
      .paging-label {
        top: 46px;
        right: 35px;
        right: calc(32vw - 76px - 43px);
        left: auto;
      }
      .swiper-slide {
        max-width: 68vw;
        width: 68vw;
        .v-image {
          width: 100%;
          max-height: 444px;
        }
        p {
          font-size: 18px;
          padding: 47px 0 0 0;
        }
      }
      .swiper {
        padding-right: 32vw;
      }
    }
    @media (max-width: $media-xs) {
      padding-bottom: 0;
    }
  }
</style>
