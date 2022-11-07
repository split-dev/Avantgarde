<template>
    <div class="page" ref="aboutDetailPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">

      <BigTextSection
        theme="light"
        class-name="big-text-with-image text-center"
        v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}"
        :centered="true"
        :text="interpolateString(`**${content?.hero_text || ''}**`)">
        <v-img
          :src="content?.hero_image?.filename"
          class="position-absolute z-behind"
          width="56vw"
          :max-width="$vuetify.breakpoint.mobile ? '' : '1088px'"
        />
      </BigTextSection>

      <TextImageSection
        v-for="block in textImageBlocks"
        v-editable="block"
        :key="block._uid"
        class="bg-dark description--shortened"
        theme="dark"
        :aboveLine="false"
        :mobileReplaceImage="false"
        :title="block.title"
        :description="block.text"
        :image="block.image?.filename"
        :reverseImage="block.reverse"
        :linkLabel="block.cta_label"
        :linkUrl="block.cta_url?.url || block.cta_url?.cached_url"
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

import BigTextSection from "@/components/BigTextSection";
import TextImageSection from "@/components/TextImageSection";
import FooterSection from "@/components/FooterSection";

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "AboutDetailPage",

  mixins: [intersectionMixin],

  components: {
    BigTextSection,
    TextImageSection,
    FooterSection
  },

  props: {
    slug: {
      type: String
    },
  },

  data: () => ({
    story: null,
  }),

  async created() {
    this.story = await useStoryblok(`about/${this.slug}`, { ...this.storyOptions });
  },

  computed: {
    content() {
      return this.story?.content;
    },

    textImageBlocks() {
      return this.content?.text_image_blocks;
    },
  },
}
</script>

<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/big_text_with_image";

::v-deep .big-text-with-image {
  .big-text-container {
    @media (max-width: $media-sm) {
      min-height: 50vw;
      padding-bottom: 40px;
      padding-top: 40px;
      padding-left: 40px !important;
      padding-right: 40px;
    }
    @media (max-width: $media-xs) {
      min-height: 100vw;
    }
  }

  .big-text {
    @media (max-width: $media-sm) {
      height: calc(50vw + 100px);
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
    @media (max-width: $media-xs) {
      height: calc(100vw + 100px);
    }
  }

  .v-image {
    @media (max-width: $media-sm) {
      min-height: 50vw;
      height: 50vw !important;
      left: 30px;
      right: 30px;
      top: 50px;
      width: calc(100% - 60px) !important;
    }

    @media (max-width: $media-xs) {
      min-height: 100vw;
      height: 100vw !important;
    }
  }
}
</style>