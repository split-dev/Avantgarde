<template>
  <div class="page page--workDetail" ref="workDetailPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <div ref="animationBackdrop" class="animation-backdrop"></div>

    <WorkDetailIntroSection
      :theme="content?.detail_intro_theme || 'dark'"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 1.0] }}"
      data-section="workDetailIntro"
      :verticalTitle="content?.detail_intro_title"
      :title="content?.detail_intro_headline"
      :mobileTitle="content?.detail_intro_headline_mobile"
      :description="content?.detail_intro_description"
      :image="content?.detail_intro_image?.filename"
    />

    <BigTextSection
      v-if="content?.big_text || content?.big_text_image?.filename"
      :theme="content?.big_text_theme || 'light'"
      class-name="big-text-with-image"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}"
      data-section="big-text"
      :text="bigText"
    >
      <v-img
        :src="content?.big_text_image?.filename"
        class="position-absolute z-behind"
        height="818px"
      />
    </BigTextSection>

    <SingleVideoSection
      v-if="content?.video_src?.filename"
      class="video-section bg-dark"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}"
      data-section="video"
      :video="content?.video_src?.filename"
      :poster="content?.video_preview_image?.filename"
    />

    <TextImageSection
      v-if="content?.info_heading ||content?.info_description || content?.info_image?.filename"
      :theme="content?.info_theme || 'dark'"
      :mobileReplaceImage="true"
      :title="content?.info_heading"
      :description="content?.info_description"
      :image="content?.info_image?.filename"
    />

    <BigCarouselSection
      v-if="carouselItems?.length"
      :title="content?.detail_intro_title"
      :blocks="carouselItems?.map(item => ({
        image: item.Image?.filename,
        content: item.Text,
      }))"
      :theme="content?.image_carousel_theme || 'dark'"
    />

    <CarouselDefaultSection
      v-if="more?.length"
      :blocks="more?.map(work => ({
        workId: work.slug,
        image: work.content?.list_view_image?.filename,
        heading: work.content?.list_view_heading,
      }))"
      :title="content?.more_headline || 'more'"
      :theme="content?.more_theme || 'light'"
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
import WorkDetailIntroSection from "@/components/WorkDetailIntroSection";
import BigTextSection from "@/components/BigTextSection";
import SingleVideoSection from "@/components/SingleVideoSection";
import TextImageSection from "@/components/TextImageSection";
import BigCarouselSection from "@/components/BigCarouselSection";
import CarouselDefaultSection from "@/components/CarouselDefaultSection";
import FooterSection from "@/components/FooterSection";
import { intersectionMixin } from "@/mixins/IntersectionMixin";

/* https://greensock.com/docs/ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "WorkDetail",
  props: {
    id: {
      type: String
    }
  },
  mixins: [intersectionMixin],
  components: {
    WorkDetailIntroSection,
    BigTextSection,
    SingleVideoSection,
    TextImageSection,
    BigCarouselSection,
    CarouselDefaultSection,
    FooterSection
  },
  async created() {
    if (!this.id) return;
    this.story = await useStoryblok(`work/${this.id}`,
    // ApiOptions
    {
      resolve_relations: ['WorkDetailTemplate.more'],
      ...this.storyOptions,
    },
    // BridgeOptions (camelCase!)
    {
      resolveRelations: ['WorkDetailTemplate.more'],
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
  data: () => ({
    story: null,
  }),
  computed: {
    content() {
      return this.story?.content;
    },
    carouselItems() {
      return this.content?.image_carousel_items;
    },
    more() {
      return this.content?.more;
    },
    bigText() {
      return this.interpolateString(this.content?.big_text || '');
    },
  },
}
</script>


<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/big_text_with_image";
</style>
