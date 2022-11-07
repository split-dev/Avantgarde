<template>
  <div class="page page--location-detail" ref="locationDetailPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <div ref="animationBackdrop" class="animation-backdrop"></div>
    Location {{id}}
    <FooterSection ref="footer" v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}" data-section="footer"/>
    <div class="left-line"></div>
  </div>
</template>

<script>
import FooterSection from "@/components/FooterSection";
import {intersectionMixin} from "@/mixins/IntersectionMixin";

/* https://greensock.com/docs/ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


export default {
  name: 'LocationDetailPage',
  components: {
    FooterSection,
  },
  mixins: [intersectionMixin],
  props: {
    id: {
      type: String
    }
  },
  data:() => ({}),
  created() {

  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    gsap.set(this.$refs.animationBackdrop, {
      width: '100vw',
      top: 0,
      background: '#141313',
      transform: 'translate(0,0)',
      height: '100%',
      left: 'initial',
      right: '0',
      opacity: 1
    });
  }
}
</script>
