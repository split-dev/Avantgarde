<template>
  <div class="page page--thought-detail" ref="thoughtDetailPage" :data-thought="id" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <div ref="animationBackdrop" class="animation-backdrop"></div>

    <ThoughtHeaderSection
      data-section="thought-header"
      :title="content?.title"
      :date="parsedDate ? $d(parsedDate, 'short') : null"
      theme="light"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
    />

    <template v-for="(section, idx) in sections">
      <BigImageSection
        v-if="section.component === 'Image'"
        v-editable="section"
        :key="idx"
        theme="light"
        :src="section.image?.filename"
      />
      <QuoteSection
        v-if="section.component === 'ArticleQuote'"
        v-editable="section"
        :key="idx"
        theme="light"
        :text="section.text"
      />
      <RichTextSection
        v-if="section.component === 'Rich text'"
        v-editable="section"
        :key="idx"
        theme="light"
        :text="section.Content"
      />
    </template>

    <ThoughtsSection
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}"
      data-section="thoughts-carousel"
      :title="$t('you_might_also_be_interested_in')"
      :label="$t('all_thoughts')"
      :vertical-title="$t('more')"
      theme="light"
      class="bg-white"
      :blocks="more?.map(m => ({
        title: m.content?.list_view_title,
        image: m.content?.list_view_image?.filename,
        intro: m.content?.list_view_intro,
      }))"
    />

    <FooterSection ref="footer" v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}" data-section="footer"/>
    <div class="left-line"></div>
  </div>
</template>

<script>
  import FooterSection from "@/components/FooterSection";
  import ThoughtHeaderSection from "@/components/ThoughtHeaderSection";
  import BigImageSection from "@/components/BigImageSection";
  import ThoughtsSection from "@/components/ThoughtsSection";
  import RichTextSection from "@/components/RichTextSection";
  import QuoteSection from "@/components/QuoteSection";
  import {intersectionMixin} from "@/mixins/IntersectionMixin";
  import moment from 'moment'

  /* https://greensock.com/docs/ */
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

  import { useStoryblok } from "@storyblok/vue-2";

  export default {
    name: 'ThoughtDetailPage',

    components: {
      FooterSection,
      ThoughtHeaderSection,
      BigImageSection,
      ThoughtsSection,
      RichTextSection,
      QuoteSection
    },

    mixins: [intersectionMixin],

    props: {
      id: {
        type: String
      }
    },

    data:() => ({
      story: null,
      sbDateFormat: "YYYY-MM-DD HH:mm",
      outputDateFormat: "D. MMM YYYY",
    }),

    async created() {
      if (!this.id) return;
      this.story = await useStoryblok(`thoughts/${this.id}`,
      // ApiOptions
      {
        resolve_relations: ['ThoughtDetailTemplate.related_thoughts_thoughts'],
        ...this.storyOptions,
      },
      // BridgeOptions (camelCase!)
      {
        resolveRelations: ['ThoughtDetailTemplate.related_thoughts_thoughts'],
      });
    },

    mounted() {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);

      gsap.set(this.$refs.animationBackdrop, {
        width: '100vw',
        top: 0,
        background: 'rgba(0, 0, 0, 0)',
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

      sections() {
        return this.content?.sections;
      },

      more() {
        return this.content?.related_thoughts_thoughts;
      },

      parsedDate() {
        if (!this.content?.title) return null;
        const date = moment(this.content?.date, this.sbDateFormat);
        return date.isValid() ? date : null;
      },
    },
  }
</script>


<style lang="scss">
@import "../assets/styles/variables";

.rich-text + .big-img .big-img-container {
  @media (max-width: $media-sm) {
    padding-top: 0;
  }
}

.big-img + .thoughts-section {
  margin-top: 166px;
  box-shadow: 0 -166px 0 0 $light-text;
  @media (max-width: $media-sm) {
    margin-top: 60px;
    box-shadow: 0 -60px 0 0 $light-text;
  }
}

.thoughts-section {
  padding-top: 157px;
  .vertical-text, .thoughts-carousel-block {
    border-top: 1px solid $border-color;
  }
  @media (max-width: $media-md) {
    padding-top: 0;
    .vertical-text, .thoughts-carousel-block {
      border-top: 0;
    }
  }
}
</style>
