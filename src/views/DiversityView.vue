<template>
  <div
    class="page"
    ref="diversityPage"
    :data-active-views="activeViewsString"
    @wheel="onWheelFooter"
  >
    <DiversityBigTextSection
      theme="light"
      class-name="big-text-with-image text-center padding-small"
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"
      :center="true"
      :text="interpolateString(`**${content?.hero_text}**`)"
    >
      <v-img
        :src="content?.hero_image?.filename"
        class="position-absolute z-behind"
        width="56vw"
        :max-width="$vuetify.breakpoint.mobile ? '' : '1088px'"
      />
    </DiversityBigTextSection>

    <DiversityTextImageSection
      v-for="(section, idx) in textImageSections"
      :key="idx"
      class="bg-dark description--shortened"
      theme="dark"
      :aboveLine="false"
      :mobileReplaceImage="false"
      :reverseImage="false"
      :title="section.title"
      :description="section.text"
      :image="section.image.filename"
      v-editable="section"
    />
    <DiversityFactsSection class="bg-dark description--shortened" :sidebar_title="content?.facts_title" :facts="content?.facts"/>

    <SustainabilitySection
      theme="light"
      ref="comitee"
      v-intersect="{handler: onIntersectSection, options: { threshold: [ 0.2, 0.5, 1.0] }}"
      data-section="comitee"
      :title="content?.comitee_header"
      :sidebar_title="content?.comitee_title"
      :photos="comiteeSlider?.map(teaser => ({
        editable: teaser,
        image: teaser.Slider_image?.filename,
        heading: teaser.Slider_text,
      }))"
    />

    <TeamSection
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"
      ref="teamSection"
      data-section="team"
      :title="content?.team_title"
      :description="content?.team_description"
      :ctaLabel="content?.Team_Section_Cta_Label"
      :ctaUrl="
        content?.Team_Section_Cta_Url?.url ||
        content?.Team_Section_Cta_Url?.cached_url
      "
      :photos="
        teamVideos?.map((item) => ({
          editableBlock: item,
          video: item.video?.filename,
          image: item.placeholder_image?.filename,
        }))
      "
    />
    <FooterSection
      ref="footer"
      v-intersect="{
        handler: onIntersectFooter,
        options: { threshold: [0.0] },
      }"
      data-section="footer"
    />
    <div class="left-line"></div>
  </div>
</template>

<script>
import { intersectionMixin } from "@/mixins/IntersectionMixin";

import SustainabilitySection from "@/components/SustainabilitySection";
import DiversityBigTextSection from "@/components/BigTextSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";
import DiversityTextImageSection from "@/components/DiversityTextImageSection";
import DiversityFactsSection from "@/components/DiversityFactsSection";

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "DiversityPage",
  mixins: [intersectionMixin],
  components: {
    DiversityBigTextSection,
    DiversityTextImageSection,
    DiversityFactsSection,
    SustainabilitySection,
    TeamSection,
    FooterSection,
  },
  data: () => ({
    story: null,
  }),
  async created() {
    this.story = await useStoryblok("careers/diversity", { ...this.storyOptions });
  },

  computed: {
    content() {
      return this.story?.content;
    },

    hero() {
      return this.content?.hero;
    },

    textImageSections() {
      return this.content?.diversity_image_text || [];
    },

    comiteeSlider(){
      return this.content?.Diversity_Slider
    },

    teamVideos() {
      return this.content?.team_image_video;
    },
  },
};
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
