<template>
  <div class="page page--works" ref="worksPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <div ref="animationBackdrop" class="animation-backdrop"></div>

    <BigTextSection
      line-type="4"
      no-animated
      className="big-intro-text-section works-intro"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText"
    >
      <ul class="hover-images-list">
        <li
          v-for="work in works"
          :key="work.content?.list_view_title"
          @click="goToSection(removeSpaces(work.content?.list_view_title, '-'))"
        >
          {{work.content?.list_view_title}}
          <v-img
            :src="work.content?.list_view_image?.filename"
            height="522px"
            min-height="522px"
            min-width="55vw"
            :contain="true"
            position="right"
          />
        </li>
      </ul>
    </BigTextSection>

    <WorksCarousel
      :works="works?.map(work => ({
        id: work.slug,
        title: work.content?.list_view_title,
        verticalTitle: work.content?.list_view_title_short || work.content?.list_view_title,
        image: work.content?.list_view_image?.filename,
        heading: work.content?.list_view_heading,
        description: work.content?.list_view_intro,
        theme: work.content?.list_view_theme,
        linkLabel: content?.learn_more_label || 'Learn more',
      }))"
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
import { intersectionMixin } from "@/mixins/IntersectionMixin";
import BigTextSection from '../components/BigTextSection';
import FooterSection from "@/components/FooterSection";
import WorksCarousel from "@/components/WorksCarousel";

/* https://greensock.com/docs/ */
import gsap from 'gsap';

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "WorksPage",

  components: {
    BigTextSection,
    WorksCarousel,
    FooterSection,
  },

  mixins: [intersectionMixin],

  data:() => ({
    story: null,
    relations: ['WorkTemplate.works', 'WorkTemplate.more'],
  }),

  async created() {
    this.story = await useStoryblok('work',
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

    const worksBlock = this.$refs.worksPage.querySelector('.works-intro .line-bg');

    gsap.timeline({
      defaults: {ease: "none"},
      scrollTrigger: {
        trigger: this.$refs.worksPage,
        scrub: true,
        start: 'top top',
        end: 'bottom'
      }})
        .to(worksBlock, {
         transform: 'translateY(-200vw)'
        }, 0)
  },

  computed: {
    content() {
      return this.story?.content;
    },
    bigText() {
      return this.interpolateString(this.content?.title || '');
    },
    works() {
      return this.content?.works;
    },
    more() {
      return this.content?.more;
    },
  },
}
</script>

<style scoped lang="scss">
@import "./src/assets/styles/variables";

@import "./src/assets/styles/blocks/hover_images_list";
@import "./src/assets/styles/animations/big_intro_text_slide";
@import "./src/assets/styles/blocks/works_intro";
</style>
