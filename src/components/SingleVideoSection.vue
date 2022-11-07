<template>
  <SectionPrototype container-class-name="single-video-container overflow-hidden" above-line content-center>
    <v-col cols="12">
      <vue-video-section
          ref="videoPlayer"
          elementId="videoPlayer"
          :mp4Source="video"
          :posterSource="poster"
          :mobileBreakpoint="600"
          :desktopHeight="924"
          :mobileHeight="592"
          :playsinline="true"
          :loop="true"
          :autoplay="false"
          :autobuffer="true"
          :muted="false">
      </vue-video-section>
      <button ref="playBtn" class="play-arrow position-absolute" @click="playVideo">
        <ArrowTransparentIcon/>
      </button>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import ArrowTransparentIcon from "@/components/icons/ArrowTransparentIcon";

import 'vue-video-section/dist/vue-video-section.css'
import VueVideoSection from 'vue-video-section';

export default {
  name: "SingleVideoSection",
  props: {
    poster: {
      type: String
    },
    video: {
      type: String
    },
  },
  components: {
    'vue-video-section': VueVideoSection,
    SectionPrototype,
    ArrowTransparentIcon
  },
  methods: {
    playVideo() {
      const overlay = this.$refs.videoPlayer.$el.querySelector('.vue-video-section__overlay-content-wrapper__background');

      this.$refs.videoPlayer.playVideo();
      this.$refs.playBtn.classList.add('d-none');
      overlay.classList.add('interactive');

      overlay.addEventListener('click', () => {
        this.$refs.videoPlayer.pauseVideo();
        this.$refs.playBtn.classList.remove('d-none');
        overlay.classList.remove('interactive');
      }, {
        passive: true,
        once: true
      });
    }
  },
  data: () => ({
    options: {}
  })
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

::v-deep .single-video-container {
  padding: 150px 140px;
  .play-arrow {
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 11;
    display: block;
    border: 1px solid white;
    border-radius: 50%;
    transition: all ease-in-out 200ms;
    svg {
      width: 100%;
      height: 100%;
    }
    &:hover {
      color: black;
      background-color: white;
    }
  }

  .vue-video-section__video-element {
    z-index: 9;
  }
  .vue-video-section__overlay-content-wrapper__content-wrapper {
    z-index: 10;
  }
  .vue-video-section__overlay-content-wrapper__background {
    opacity: 0;
    z-index: 10;
    &.interactive {
      z-index: 11;
      cursor: pointer;
      &:hover {
        opacity: 0.2;
      }
    }
  }

  @media (max-width: $media-sm) {
    padding: 50px 28px;
    .play-arrow {
      width: 30px;
      height: 30px;
      svg path {
        stroke-width: 4px;
      }
    }
  }
}

@import "./src/assets/styles/animations/video_slide";
</style>
