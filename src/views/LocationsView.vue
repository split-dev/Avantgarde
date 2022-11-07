<template>
  <div
    class="page page--locations"
    ref="locationsPage"
    :data-active-views="activeViewsString"
    @wheel="onWheelFooter"
  >
    <div ref="animationBackdrop" class="animation-backdrop"></div>
    <BigTextSection
      no-animated
      lineType="3"
      className="big-intro-text-section locations-intro"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0] }}"
      data-section="big-text"
      :text="interpolateString(story?.content?.header_text)"
      theme="dark"
    >
      <ServicesTeasersBlock
        class="tw-justify-end"
        :imgHeight="400"
        :servicesImagesBlocks="locationImageBlocks"
        @blockClick="goToSection"
      />
    </BigTextSection>

    <div
      v-for="(location, idx) in locations"
      v-editable="location"
      :key="location._uid"
    >
      <LocationCitiesSection
        v-intersect="{handler: onIntersectSection, options: { threshold: [ 0.0, 0.2, 0.5, 1.0] }}"
        :verticalTitle="location.vertical_text"
        :title="location.title"
        :cities="location.cities"
        :contact="location.contact?.[0]"
        :theme="idx % 2 ? 'dark' : 'light'"
        :id="removeSpaces(location.vertical_text, '-')"
      />

      <CarouselDefaultSection
        :blocks="location.work?.map(work => ({
          workId: work.slug,
          image: work.content?.list_view_image?.filename,
          heading: work.content?.list_view_heading,
        }))"
        title=""
        :headline="getWorkTitle(location.vertical_text)"
        :theme="idx % 2 ? 'dark' : 'light'"
      />
    </div>

    <BigTextSection
      no-animated
      lineType="3"
      className="big-intro-text-section services-intro"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0] }}"
      data-section="big-text"
      :text="interpolateString(story?.content?.neon_text)"
      theme="dark"
    >

    </BigTextSection>

    <FooterSection ref="footer" v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}" data-section="footer"/>
    <div class="left-line"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import gsap from 'gsap';
import { useStoryblok } from "@storyblok/vue-2";
import {intersectionMixin} from "@/mixins/IntersectionMixin";

import BigTextSection from "@/components/BigTextSection";
import FooterSection from "@/components/FooterSection";
import LocationCitiesSection from "@/components/LocationCitiesSection";
import CarouselDefaultSection from "@/components/CarouselDefaultSection";

export default {
  name: 'LocationsPage',
  components: {
    BigTextSection,
    FooterSection,
    LocationCitiesSection,
    CarouselDefaultSection,
  },
  mixins: [intersectionMixin],
  props: {
    locationName: {
      type: String
    }
  },
  data:() => ({
    story: null,
    scrolled: false,
    relations: ['LocationSection.work'],
  }),
  async created() {
    this.story = await useStoryblok(
      this.$route.name,
      {
        resolve_relations: this.relations.join(','),
        ...this.storyOptions,
      },
      // BridgeOptions (camelCase!)
      {
        resolveRelations: this.relations,
      }
    );
  },
  watch: {
    locations: {
      immediate: true,
      handler(val) {
        if (!this.locationName || this.scrolled || !val) return;
        Vue.nextTick(() => this.goToSection(this.removeSpaces(this.locationName, '-')));
        this.scrolled = true;
      },
    },
  },
  mounted() {
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
  },

  computed: {
    content() {
      return this.story?.content;
    },
    locations() {
      return this.content?.locations;
    },
    locationImageBlocks() {
      return this.locations?.map(location => ({
          title: location.tile_title || location.vertical_text,
          image: location.tile_image,
          link: location.vertical_text?.toLowerCase(),
          description: location.cities?.map(city => city.name).join('<br>'),
        }));
    }
  },

  methods: {
    getWorkTitle(title) {
      return title ? `${ this.$t('work_we_did_in') } ${ title }` : ''
    }
  }
}
</script>