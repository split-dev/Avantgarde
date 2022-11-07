<template>
  <SectionPrototype className="carousel-blocks" :verticalTitle="title" :theme="theme"
                    data-section="default-carousel"
                    v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5] }}">
    <div
      v-if="headline"
      class="title-h1
        tw-px-[26px] tw-pt-[26px]
        md:tw-px-[40px]
    ">
      {{ headline }}
    </div>
    <CarouselBlock
      :identifier="`${removeSpaces(title, '-')}-carousel`"
      :gap="$vuetify.breakpoint.mobile ? 20 : 12"
      type="custom"
    >
      <i18n-link class="swiper-slide" v-for="block in blocks" :key="block.key" :to="`/work/${block.workId}`">
        <div>
          <v-img :src="block.image"
                 :max-width="$vuetify.breakpoint.mobile ? '70vw' : '383px'"
                 max-height="737px"
                 :height="$vuetify.breakpoint.mobile ? '467px' : '737px'" cover eager></v-img>
          <h3 class="carousel-title" v-if="block.heading">{{block.heading}}</h3>
          <p v-if="block.content">{{block.content}}</p>
        </div>
      </i18n-link>
    </CarouselBlock>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import CarouselBlock from '../components/bloks/CarouselBlock';
import { intersectionMixin } from "@/mixins/IntersectionMixin";

export default {
  name: "CarouselDefaultSection",
  props: {
    title: {
      type: String
    },
    headline: {
      type: String
    },
    theme: {
      type: String
    },
    blocks: {
      type: Array
    }
  },
  mixins: [intersectionMixin],
  components: {
    SectionPrototype,
    CarouselBlock
  },
  data: () => ({}),
}
</script>


<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .carousel-blocks ::v-deep {
    padding-bottom: 60px;
    .vertical-text {
      top: 100%;
    }
    .container {
      max-width: calc(100vw - 160px);
      @media (max-width: $media-sm) {
        max-width: calc(100vw - 60px);
      }
    }
    .flex-fill.h-100 {
      height: auto !important;
    }
    .paging-label {
      display: none !important;
    }
    .swiper {
      padding-right: 200px;
    }
    .swiper-wrapper {
      padding: 60px 40px;
      height: auto;
    }
    .swiper-slide {
      max-width: 383px;
      position: relative;
      .v-image {
        min-height: 100%;
        &__image {
          transform: scale(1);
          transition: transform ease-in 400ms;
        }
      }
      .carousel-title {
        font-size: 45px;
        line-height: 50px;
        position: absolute;
        bottom: 49px;
        top: auto;
        box-sizing: border-box;
        width: 100%;
        padding: 0 31px;
        color: #fff;
        transition: bottom ease-in-out 300ms;
      }

      &:hover {
        .v-image__image {
          transform: scale(1.2);
        }
        .carousel-title {
          bottom: 70px;
        }
      }
    }

    @media (max-width: $media-xs) {
      padding-bottom: 0;
      .vertical-text {
        top: 0;
      }
      .paging-label {
        display: block !important;
        position: absolute;
        right: 25px;
        top: 32px;
        font-size: 20px;
      }
      .swiper-wrapper {
        padding: 76px 0 38px 6px;
      }
      .swiper-slide {
        max-width: 70vw;
        width: 70vw;
        .carousel-title {
          bottom: 26px;
          padding: 0 15px 0 26px;
          font-size: 35px;
          line-height: 45px;
        }
      }
    }
  }

  @import "../assets/styles/animations/carousel_items_slide";
</style>
