<template>
  <div class="page page--services" ref="servicesPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <div ref="animationBackdrop" class="animation-backdrop"></div>
    <BigTextSection no-animated lineType="3" className="big-intro-text-section services-intro" v-intersect="{handler: onIntersectSection, options: { threshold: [0.0] }}" data-section="big-text" :text="bigText">
      <ServicesTeasersBlock
        :imgHeight="400"
        @blockClick="goToSection"
        :servicesImagesBlocks="services?.map(service => ({
          ...service,
          link: removeSpaces(service.title),
        }))"
      />
    </BigTextSection>

    <PictureItemsSection
      v-for="service in services"
      v-editable="service"
      :key="service._uid"
      :id="removeSpaces(service.title)"
      :theme="service.theme"
      :reverse="service.reverse"
      :data-section="service.title"
      :vertical-title="service.sidebar_title"
      :image="(service.image || {}).filename"
      :heading="service.heading"
      :itemsList="(service.service_items || []).map(i => ({
        editableBlock: i,
        title: i.content,
      }))
      "
    />

    <ExtendedCtaSection
      v-for="ctaSection in ctaSections"
      v-editable="ctaSection"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.2, 0.5, 1.0] }}"
      id="digital-solutions"
      theme="dark"
      data-section="solutions"
      :key="ctaSection._uid"
      :title=ctaSection.title
      :description=ctaSection.description
      :image="(ctaSection.image || {}).filename"
      :imageMobile="(ctaSection.imageMobile || {}).filename"
      :descriptionExtras="ctaSection.description_extras_images?.map(extra => ({
        image: extra.image.filename,
        link: extra.link?.cached_url,
      }))"
      :descriptionExtra="ctaSection.descriptionExtra"
      :blocks="(ctaSection.blocks || []).map(i => i.content)"
    />

    <FooterSection
      ref="footer"
      v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}"
      data-section="footer"
    />
    <div class="left-line"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import FooterSection from "@/components/FooterSection";
  import BigTextSection from "@/components/BigTextSection";
  import PictureItemsSection from "@/components/PictureItemsSection";
  import ExtendedCtaSection from "@/components/ExtendedCtaSection";
  import ServicesTeasersBlock from "@/components/bloks/ServicesTeasersBlock";
  import { intersectionMixin } from "@/mixins/IntersectionMixin";

  /* https://greensock.com/docs/ */
  import gsap from 'gsap';

  import { useStoryblok } from "@storyblok/vue-2";

  export default {
    name: 'HomePage',
    components: {
      BigTextSection,
      FooterSection,
      PictureItemsSection,
      ExtendedCtaSection,
      ServicesTeasersBlock
    },
    props: {
      serviceName: {
        type: String
      }
    },

    mixins: [intersectionMixin],

    data:() => ({
      story: null,
      scrolled: false,
    }),

    watch: {
      services: {
        immediate: true,
        handler(val) {
          if (!this.serviceName || this.scrolled || !val) return;
          Vue.nextTick(() => this.goToSection(this.serviceName));
          this.scrolled = true;
        },
      },
    },

    async created() {
      this.story = await useStoryblok('services', { ...this.storyOptions });
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
        return (this.story || {}).content || {};
      },
      services() {
        return this.content.services;
      },
      bigText() {
        return this.interpolateString(this.content.hero_heading || '');
      },
      ctaSections() {
        return this.content.cta_section;
      }
    },
  }
</script>

<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "../assets/styles/blocks/services_intro";

.app-footer .footer-content {
  border-top: 1px solid #b5b5b5 !important;
}
</style>
