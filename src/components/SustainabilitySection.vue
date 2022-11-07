<template>
  <SectionPrototype
    :theme="theme"
    :verticalTitle="sidebar_title"
    className="sustainability"
    container-class-name="px-0 py-0 container--adjusted"
  >
    <div class="sustainability__heading__container">
      <h2 class="mb-5 title-h1">{{ title }}</h2>
      <div class="sustainability__heading__content body-text">
        <p>{{ copy }}</p>
      </div>
    </div>

    <div class="w-100">
      <div class="sustainability__slider__container mb-1 mb-md-4 mb-lg-8">
        <b class="paging-label body-text d-block text-right">{{makeZeroNumber(currentSlide + 1)}}-{{makeZeroNumber(slidesLength)}}</b>
      </div>

      <div class="sustainability__slider__container-2 border-box">
        <div class="swiper" :id="id">
          <div class="swiper-wrapper" ref="swiperWrapper">
            <div class="swiper-slide"
              v-for="(item, index) in photos"
              v-editable="item.editable"
              :key="index" 
            >
              <v-row no-gutters>
                <v-col cols="12" lg="7">
                  <v-img :src="item.image"
                    height="100%"
                    :aspect-ratio="$vuetify.breakpoint.mobile  ? '0.75' : '1'"
                  />
                </v-col>
                <v-col cols="12" lg="5" class="bg-dark">
                  <div class="sustainability__slider__slide-content d-flex align-center h-100 border-box">
                    <div class="w-100">
                      <h3 class="mb-6 mb-md-12 title-h1 text-white">{{item.heading}}</h3>
                      <div class="body-text text-white pl-lg-16 ml-xl-5 pr-lg-6">
                        <p>{{item.content}}</p>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sustainability__list__container">
      <v-row>
        <v-col cols="12" lg="6">
          <v-img
            eager
            :max-width="$vuetify.breakpoint.mobile ? '80vw' : '50vw'"
            height="100%"
            :src="image"
          />
        </v-col>
        <v-col cols="12" lg="6">
          <ul class="locations-list">
            <li
              v-editable="item.editableBlock"
              v-for="(item, i) in locationList"
              :key="i"
            >
              <i18n-link
                :to="item.url"
                class="text-decoration-none dark--text"
              >
                <h3
                  class="title-h2"
                  v-html="$vuetify.breakpoint.mobile && item.headingMobile
                    ? item.headingMobile
                    : item.heading"
                />
                <div v-if="item.content">{{item.content}}</div>
                <ArrowTransparentIcon/>
              </i18n-link>
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </SectionPrototype>
</template>

<script>
import { Swiper, Scrollbar } from 'swiper';
import 'swiper/css';
import "swiper/css/scrollbar";

import SectionPrototype from "@/components/SectionPrototype";
import ArrowTransparentIcon from "@/components/icons/ArrowTransparentIcon";

export default {
  name: "SustainabilitySection",
  props: {
    sidebar_title: {
      type: String
    },
    locationList: {
      type: Array
    },
    photos: {
      type: Array,
    },
    image: {
      type: String
    },
    title: {
      type: String
    },
    copy: {
      type: String
    },
    theme: {
      type: String,
      default: 'dark',
    }
  },
  components: {
    SectionPrototype,
    ArrowTransparentIcon
  },
  beforeMount() {
    this.id = this.identifier;

    if (!this.identifier) {
      this.id = `swiper-${(Math.random() + 1).toString(36).substring(7)}`;
    }
  },
  mounted() {
    const swiper = new Swiper(`#${this.id}`, {
      modules: [Scrollbar],
      spaceBetween: this.$vuetify.breakpoint.mobile ? 10 : 61,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      freeMode: true,
      scrollbar: {
        hide: true,
        el: '.swiper-scrollbar',
      },
      on: {
        init: () => {
          this.currentSlide = 0;
          this.$emit('swipe', `${this.makeZeroNumber(this.currentSlide + 1)}-${this.makeZeroNumber(this.slidesLength)}`);
        },
        slideChange: () => {
          this.currentSlide = swiper.activeIndex;
          this.$emit('swipe', `${this.makeZeroNumber(this.currentSlide + 1)}-${this.makeZeroNumber(this.slidesLength)}`);
        }
      }
    });
  },
  data: () => ({
    currentSlide: 0,
    id: '',
  }),

  computed: {
    slidesLength() {
      if (this.photos) return this.photos.length;
      if (this.$refs.swiperWrapper) return this.$refs.swiperWrapper.querySelectorAll('.swiper-slide').length;
      return 0;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/variables";
@import "./src/assets/styles/blocks/locations_list";
@import "../assets/styles/blocks/sustainability";
</style>
