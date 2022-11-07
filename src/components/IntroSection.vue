<template>
  <SectionPrototype verticalTitle="" contentCenter className="intro-section" ref="introSection" containerClassName="intro-section-container" :theme="theme">
    <v-col class="d-flex flex-column justify-start justify-sm-center align-start" cols="12" sm="6">
      <div class="intro-image">
        <div
          v-if="$vuetify.breakpoint.mobile"
          class="tw-absolute tw-right-0 tw-bg-black animation-shadow"
        />
        <div class="tw-overflow-hidden tw-h-full">
          <v-img eager :src="image" :alt="alt" class="tw-h-full tw-ml-auto"></v-img>
        </div>
      </div>
      <div class="intro-title">
        <h1 class="title-h1" v-html="title" />
        <h2 v-if="subline" class="title-h3 d-none d-md-block" v-html="subline" />
      </div>
      <p v-if="description">{{description}}</p>
      <i18n-link
        v-if="label"
        :to="url.cached_url"
        class="arrow-link text-decoration-none"
      >
        {{label}}
      </i18n-link>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';


/* https://greensock.com/docs/ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: "IntroSection",
  props: {
    theme: {
      type: String
    },
    title: {
      type: String
    },
    subline: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    alt: {
      type: String
    },
    label: {
      type: String
    },
    url: {
      type: Object
    },
  },
  components: {
    SectionPrototype
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    const imageElement = this.$refs.introSection.$el.querySelector('.v-image');

    if (!this.$vuetify.breakpoint.mobile) {
      const desktopTrigger = document.querySelector('.page');

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: desktopTrigger,
          scrub: true,
          start: 'top top',
          end: 'bottom'
        }})
        .to(imageElement, {
          opacity: '1'
        }, 0)
        .to(imageElement, {
          opacity: '0',
          width:  '60vw',
          height: '10%',
          duration: 0.05
        }, 0)

    } else {
      const mobileTrigger = document.querySelector('.intro-section');
      const imageShadow = this.$refs.introSection.$el.querySelector('.animation-shadow');

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: mobileTrigger,
          scrub: true,
          start: 'top top',
          end: 'bottom'
        }})
        .to(imageElement, {
          opacity: '1'
        }, 0)
        .to(imageElement, {
          opacity: '0',
          x:  '100',
          duration: 20
        }, 0)

      gsap.timeline({
        defaults: {ease: "none"},
        scrollTrigger: {
          trigger: mobileTrigger,
          scrub: true,
          start: 'top top',
          end: "+=500",
        }})
        .set(imageShadow, {
          opacity: '0',
          width: '100%',
          height: '100%',
        }, 0)
        .to(imageShadow, {
          opacity: '1',
          height: '100vh',
          width: '105vw',
        }, 0)
    }
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/styles/variables";
  @import "./src/assets/styles/blocks/intro_block";
  @import "./src/assets/styles/animations/intro_slide";
</style>
