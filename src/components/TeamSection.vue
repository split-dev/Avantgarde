<template>
  <SectionPrototype
    contentCenter
    aboveLine
    className="team-section bg-white"
    containerClassName="team-section-container"
    v-intersect="animateTeamBlock"
    ref="teamSection"
  >
    <v-col
      class="d-flex flex-column justify-center align-content-center align-center"
      cols="12"
    >
      <h2 class="title-h1">{{ title }}</h2>
      <p class="body-text black--text text-center team-description">{{ description }}</p>

      <div class="d-block d-sm-none team-carousel w-100">
        <CarouselBlock
          v-if="photos"
          :items="photos"
          type="images"
          @clickPhoto="openVideo"
        />
      </div>

      <i18n-link
        v-if="ctaUrl"
        :to="ctaUrl"
        class="arrow-link text-decoration-none"
      >
        {{ ctaLabel || 'Learn more' }}
      </i18n-link>

      <div class="team-photos bg-light d-none d-sm-block">
        <div
          v-for="(photo, idx) in photos"
          :key="idx"
          v-editable="photo.editableBlock"
          class="team-photo-item"
        >
          <v-img eager :src="photo.image" cover @click="openVideo(photo)"></v-img>
        </div>
      </div>

      <v-dialog
        ref="videoPlayerDialog"
        v-model="dialog"
        :max-width="$vuetify.breakpoint.mobile ? '350' : '500'"
        content-class="team-video"
        @click:outside="closeVideo"
      >
        <vue-video-section
          v-if="currentVideo"
          :ref="`videoPlayer`"
          elementId="videoPlayer"
          :mobileHeight="480"
          :desktopHeight="700"
          :mp4Source="currentVideo"
          :posterSource="currentImg"
          :playsinline="true"
          :loop="true"
          :autoplay="dialog"
          :autobuffer="true"
          :muted="false"
        />
      </v-dialog>
    </v-col>
  </SectionPrototype>
</template>

<script>
import Vue from 'vue';
import SectionPrototype from "../components/SectionPrototype";
import CarouselBlock from "../components/bloks/CarouselBlock";
import "vue-video-section/dist/vue-video-section.css";
import VueVideoSection from "vue-video-section";

/* https://greensock.com/docs/ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: "TeamSection",
  props: {
    title: {
      type: String,
    },
    label: {
      type: String,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    ctaLabel: {
      type: String,
    },
    ctaUrl: {
      type: String,
    },
    photos: {
      type: Array,
    },
  },
  components: {
    SectionPrototype,
    CarouselBlock,
    VueVideoSection,
  },
  data: () => ({
    tl: null,
    dialog: false,
    currentVideo: "",
    currentImg: "",
  }),
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
  },
  methods: {
    animateTeamBlock() {
      this.tl?.pause(0).kill(true);

      if (window.innerWidth >= 600) {
        gsap.set(document.querySelector('.team-photos .team-photo-item:nth-child(3)'), {
          right: '-10vw'
        });

        this.tl = gsap.timeline({
          defaults: {ease: "none"},
          scrollTrigger: {
            trigger: this.$refs.teamSection.$el,
            scrub: true,
            start: 'top bottom',
            end: 'bottom center'
          }})
            .to(document.querySelector('.team-photos .team-photo-item:nth-child(3)'), {
              right: '0vw',
              duration: 0.05
            }, 0)
            .to(document.querySelector('.team-section-container'), {
              top: '-30vw',
              marginBottom: '-30vw',
              duration: 0.2
            }, '>')
            .to(document.querySelector('.team-photos .team-photo-item:nth-child(5)'), {
              left: '-10vw',
              duration: 0.1
            }, '>-0.1')
            .to(document.querySelector('.team-photos .team-photo-item:nth-child(7)'), {
              right: '-10vw',
              duration: 0.1
            }, '<');
      }
    },
    openVideo(photo) {
      this.dialog = true;
      this.currentVideo = null;
      this.currentImg = photo.image;

      Vue.nextTick(() => {
        this.currentVideo = photo.video;

        Vue.nextTick(() => {
          if (this.$refs.videoPlayer) {
            this.$refs.videoPlayer.$el.querySelector("video").currentTime = 0;
            this.$refs.videoPlayer.playVideo();
          }
        })
      })

    },
    closeVideo() {
      const videoElem = this.$refs.videoPlayer;
      this.currentVideo = null;

      videoElem.pauseVideo();
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "./src/assets/styles/blocks/team_block";
</style>
