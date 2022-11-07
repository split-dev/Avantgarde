<template>
  <div class="swiper" :id="id">
    <b v-if="!hidePager" class="paging-label body-text d-block">{{makeZeroNumber(currentSlide + 1)}}-{{makeZeroNumber(slidesLength)}}</b>
    <div class="swiper-wrapper" v-if="(type === 'images')">
      <v-img @click="$emit('clickPhoto', item)" class="swiper-slide" :contain="imagesContain" eager v-for="item in items" :key="item.key" :src="item.image"></v-img>
    </div>
    <div class="swiper-wrapper" ref="swiperWrapper" v-if="(type === 'custom')">
      <slot/>
    </div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import { Swiper, Scrollbar } from 'swiper';
import 'swiper/css';
import "swiper/css/scrollbar";

export default {
  beforeMount() {
    this.id = this.identifier;

    if (!this.identifier) {
      this.id = `swiper-${(Math.random() + 1).toString(36).substring(7)}`;
    }
  },
  mounted() {
    this.init();
  },
  name: "CarouselBlock",
  props: {
    type: {
      type: String
    },
    items: {
      type: Array
    },
    identifier: {
      type: String
    },
    imagesContain: {
      type: Boolean
    },
    hidePager: {
      type: Boolean
    },
    gap: {
      type: Number
    }
  },
  data: () => ({
    currentSlide: 0,
    slotItemsCount: 0,
    id: ''
  }),
  watch: {
    currPage: {
      immediate: true,
      handler(val) {
        this.$emit('change', val);
      },
    }
  },
  methods: {
    init() {
      const swiper = new Swiper(`#${this.id}`, {
        modules: [Scrollbar],
        spaceBetween: this.gap || 20,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        freeMode: true,
        scrollbar: {
          hide: true,
          el: '.swiper-scrollbar',
        },
        on: {
          init: () => this.currentSlide = 0,
          slideChange: () => this.currentSlide = swiper.activeIndex,
        }
      });
    },
  },
  beforeUpdate() {
    this.slotItemsCount = this.$slots?.default?.length;
  },
  computed: {
    currPage() {
      return `${this.makeZeroNumber(this.currentSlide + 1)}-${this.makeZeroNumber(this.slidesLength)}`;
    },

    slidesLength() {
      return this.items?.length || this.slotItemsCount || 0;
    },
  }
}
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: auto;
}
</style>
