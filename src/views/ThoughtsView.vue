<template>
  <div class="page page--thoughts" ref="thoughtsPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <div ref="animationBackdrop" class="animation-backdrop"></div>

    <ThoughtsGridSection
      :heading="content?.title"
      :theme="content?.theme || 'light'"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0] }}"
      data-section="thoughts-grid"
    />

    <ThoughtsBannerPickSection
      v-if="showBanner"
      :title="content?.banner_title"
      :subtitle="content?.banner_subtitle"
      :image="content?.banner_image?.filename"
      :description="content?.banner_description"
      theme="dark"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0] }}"
      data-section="thoughts-banner-pick"
    />

    <ThoughtsLatestSection
      v-if="thoughtsLatest?.length"
      :items="thoughtsLatest?.map(t => ({
        title: t.content?.list_view_title,
        content: t.content?.list_view_intro,
        image: t.content?.list_view_image?.filename,
        key: t.slug,
      }))"
      :title="content?.thoughts_latest_title"
      :theme="content?.thoughts_latest_theme || 'light'"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0] }}"
      data-section="thoughts-latest"
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
  import FooterSection from "@/components/FooterSection";
  import ThoughtsGridSection from "@/components/ThoughtsGridSection";
  import ThoughtsBannerPickSection from "@/components/ThoughtsBannerPickSection";
  import ThoughtsLatestSection from "@/components/ThoughtsLatestSection";
  import {intersectionMixin} from "@/mixins/IntersectionMixin";

  /* https://greensock.com/docs/ */
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

  import { useStoryblok } from "@storyblok/vue-2";

  export default {
    name: 'ThoughtsPage',

    components: {
      ThoughtsGridSection,
      ThoughtsBannerPickSection,
      ThoughtsLatestSection,
      FooterSection,
    },

    mixins: [intersectionMixin],

    data:() => ({
      story: null,
      relations: ['ThoughtsTemplate.thoughts_latest'],
    }),

    async created() {
      this.story = await useStoryblok('thoughts',
      // ApiOptions
      {
        resolve_relations: this.relations,
        ...this.storyOptions,
      },
      // BridgeOptions (camelCase!)
      {
        resolveRelations: this.relations,
      });
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

    computed: {
      content() {
        return this.story?.content;
      },
      thoughts() {
        return this.content?.thoughts || [];
      },
      thoughtsLatest() {
        return this.content?.thoughts_latest || [];
      },
      showBanner() {
        return this.content?.banner_title
          || this.content?.banner_subtitle
          || this.content?.banner_image?.filename
          || this.content?.banner_description;
      }
    },
  }
</script>
