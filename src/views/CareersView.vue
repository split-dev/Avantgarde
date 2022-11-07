<template>
  <div
    class="page page--careers"
    :data-active-views="activeViewsString"
    v-editable="content"
    @wheel="onWheelFooter"
  >
    <div ref="animationBackdrop" class="animation-backdrop"></div>
    <HeaderSection
      :header="header"
      line-bg
      theme="light"
    />

    <TeasersSection :job-teasers="jobTeasers" />

    <BenefitsSection :benefits="benefits" />

    <HeaderSection
      v-for="(value, i) in values"
      :header="value"
      :key="i"
      :add-top-line="i > 0"
      theme="dark"
    />

     <SustainabilitySection
      ref="sustainability"
      v-intersect="{handler: onIntersectSection, options: { threshold: [ 0.2, 0.5, 1.0] }}"
      data-section="sustainability"
      theme="light"
      :image="content?.category_links_image?.filename"
      :title="content?.slider_section_title"
      :copy="content?.slider_section_copy"
      :sidebar_title="content?.slider_section_title_short"
      :locationList="[]"
      :photos="sliderTeasers?.map(teaser => ({
        editableBlock: teaser,
        image: teaser.image?.filename,
        heading: teaser.title,
        content: teaser.copy,
      }))"
    />

    <TeamSection
      v-if="showTeamSection"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}"
      ref="teamSection"
      data-section="team"
      :title="content?.team_section_title"
      :description="content?.team_section_description"
      :ctaLabel="content?.team_section_cta_label"
      :ctaUrl="content?.team_section_cta_url?.url || content?.team_section_cta_url?.cached_url"
      :photos="teamVideos?.map(item => ({
        editableBlock: item,
        video: item.video?.filename,
        image: item.placeholder_image?.filename,
      }))"
    />

    <ContactsSection :contacts="contacts" />

    <FooterSection ref="footer" v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}" data-section="footer"/>
    <div class="left-line"></div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useStoryblok } from "@storyblok/vue-2";
import { intersectionMixin } from "@/mixins/IntersectionMixin";

import ContactsSection from '@/components/careers/ContactsSection.vue';
import BenefitsSection from '@/components/careers/BenefitsSection.vue';
import TeasersSection from '@/components/careers/TeasersSection.vue';
import HeaderSection from '@/components/careers/HeaderSection.vue';

import TeamSection from '@/components/TeamSection';
import FooterSection from '@/components/FooterSection';
import SustainabilitySection from '@/components/SustainabilitySection';

export default {
  mixins: [intersectionMixin],

  components: {
    TeamSection,
    FooterSection,
    SustainabilitySection,
    ContactsSection,
    BenefitsSection,
    TeasersSection,
    HeaderSection,
  },

  data: () => ({
    story: null,
  }),

  async created() {
    this.story = await useStoryblok(this.$route.name, { ...this.storyOptions });
  },

  computed: {
    content() {
      if (!this.story) return {};
      return this.story.content;
    },

    header() {
      if (!this.story) return {};
      return this.story.content.header[0];
    },

    jobTeasers() {
      if (!this.story) return {};
      return this.story.content.jobTeasers[0];
    },

    benefits() {
      if (!this.story) return {};
      return this.story.content.benefits[0];
    },

    values() {
      if (!this.story) return [];
      return this.story.content.values;
    },

    sliderTeasers() {
      return this.content?.slider_section_teasers;
    },

    teamVideos() {
      return this.content?.team_section_videos;
    },

    contacts() {
      if (!this.story) return {};
      return this.story.content.contacts[0];
    },

    showTeamSection() {
      return this.content?.team_section_title
      || this.content?.team_section_description
      || this.content?.team_section_cta_label
      || this.content?.teamVideos?.length;
    },
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
  },
};
</script>

<style lang="scss" scoped>
.line-bg {
  pointer-events: none;
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  right: -30%;
  bottom: 0;
  background-size: 100%;
  background-position: left bottom;
  background-image: url("data:image/svg+xml,%3Csvg width='1420' height='1681' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(-11 710 841)'%3E%3Cpath d='M-145.255 1530.392s16.998-201.252 233.496-190.882c216.499 10.37 403.605 178.568 555.613 166.378 152.008-12.19-11.623-271.287 178.313-369.588 189.936-98.302 353.99-139.321 273.233-355.41-80.758-216.089 212.753-608.741 470.658-628.502' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='10'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
