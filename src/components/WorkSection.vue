<template>
  <SectionPrototype addTopLine :verticalTitle="title" content-center theme="dark">
    <v-col cols="12" class="position-relative">
      <b class="work__counter--mobile paging-label mb-5 mt-8 text-right d-block container--adjusted--mobile d-md-none">{{makeZeroNumber(currentSlide + 1)}}-{{makeZeroNumber(blocks.length)}}</b>

      <div class="swiper pb-6 mb-md-0" id="thumbs-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="block in blocks" :key="block.id">
            <div class="work__slider__slide">
              <div class="work__slider__image-wrapper position-relative z-stack">
                <v-img
                  class="absolute-fill"
                  :src="block.img_src"
                  :lazy-src="block.img_src"
                  :alt="block.img_alt"
                />
              </div>

              <div
                class="work__slider__content px-7 d-md-none position-relative z-stack-2">
                <h2 class="title-h1">{{ block.title }}</h2>
                <i18n-link
                  v-if="block.label"
                  :to="block.url?.cached_url"
                  class="arrow-link py-5 mt-12 text-decoration-none"
                >
                  {{ block.label }}
                </i18n-link>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <div class="swiper d-none d-md-block h-100" id="big-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide d-flex" v-for="block in blocks" :key="block.id">
            <div class="work__big-slider__gap pt-md-5 pb-md-8 d-flex align-center">
              <div class="work-text-block work__big-slider__text position-relative z-stack-2">
                <h2 class="title-h1">{{ block.title }}</h2>
                <i18n-link
                  v-if="block.label !== ''"
                  :to="block.url?.cached_url"
                  class="work__big-slider__link arrow-link py-5 text-decoration-none"
                >
                  {{ block.label }}
                </i18n-link>
              </div>
            </div>
            <div class="work__big-slider__image">
              <div class="work__big-slider__image-wrapper position-relative z-stack">
                <v-img
                  class="absolute-fill h-100 w-100 z-behind"
                  :src="block.img_src"
                  :lazy-src="block.img_src"
                  :alt="block.img_alt"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <b class="work__counter--desk paging-label body-text d-none d-md-block">{{makeZeroNumber(currentSlide + 1)}}-{{makeZeroNumber(blocks.length)}}</b>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import { Swiper, EffectFade } from 'swiper';
import 'swiper/css';

export default {
  name: "WorkSection",
  props: {
    title: {
      type: String
    },
    blocks: {
      type: Array,
      default: () => []
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({
    currentSlide: 0
  }),
  mounted() {
    const sliderThumbs = new Swiper('#thumbs-swiper', {
      spaceBetween: 10,
      centeredSlides: !this.$vuetify.breakpoint.mobile,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      speed: 400,
      freeMode: true,
      navigation: {
        nextEl: "#thumbs-swiper .swiper-button-next",
        prevEl: "#thumbs-swiper .swiper-button-prev"
      },
      on: {
        slideChange: () => {
          bigSlider.slideTo(sliderThumbs.activeIndex, 400);
        }
      }
    });

    const bigSlider = new Swiper("#big-swiper", {
      modules: [EffectFade],
      spaceBetween: 10,
      effect: 'fade',
      slideToClickedSlide: true,
      speed: 400,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: "#big-swiper .swiper-button-next",
        prevEl: "#big-swiper .swiper-button-prev"
      },
      thumbs: {
        swiper: sliderThumbs
      },
      on: {
        slideChange: () => {
          this.currentSlide = bigSlider.activeIndex;
        }
      }
    });
  },
}
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .work-carousel-section {
    &.theme--dark {
      background-color: $dark-bg;
    }
  }

  .work-carousel-section ::v-deep .container--fluid {
    max-width: calc(100vw - 160px);
    padding-top: 0;
    padding-bottom: 0;
    @media (max-width: $media-sm) {
      max-width: calc(100vw - 60px);
    }
  }

  #thumbs-swiper {
    max-width: 460px;
    margin-right: 0;
    .swiper-slide {
      width: 280px;
    }
    @media (min-width: $media-sm) {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 3; 
    }
  }

  #big-swiper .swiper-slide:not(.swiper-slide-active) {
    z-index: 0;
    pointer-events: none;
  }

  .work {
    &__counter {
      &--desk {
        margin-top: -22px;
        padding-left: 44px;
      }
      &--mobile {
        font-size: 20px;
      }
    }
    &__big-slider {
      &__gap {
        width: 38%;
        padding-left: 44px;
      }
      &__image {
        width: 62%;
      }
      &__image-wrapper {
        padding-bottom: 100%;
        @media (min-width: 1199px) {
          padding-bottom: 85%;
        }
        @media (min-width: 1440px) {
          padding-bottom: 100%;
        }
      }
      &__text {
        min-width: 44vw;
        padding-top: 50px;
        padding-bottom: 50px;
        @media (min-width: $media-sm) {
          min-width: 79vw;
        }
        @media (min-width: 1440px) {
          min-width: 44vw;
          padding-top: 10vh;
          padding-bottom: 10vh;
        }
      }
      &__link {
        margin-top: 35px;
        @media (min-width: $media-sm) {
          margin-top: 70px;
        }
        @media (min-width: 1440px) {
          margin-top: 132px; 
        }
      }
      @media (max-width: $media-md) {
        padding-right: 150px;
        .swiper-slide {
          width: 280px;
        }
      }
    }
    &__slider {
      &__image-wrapper {
        padding-bottom: 167%;
        @media (min-width: $media-sm) {
          padding-bottom: 65%;
        }
      }
      &__content {
        margin-top: -50%;
      }
    }
  }

  @import "./src/assets/styles/animations/works_slide";
</style>
