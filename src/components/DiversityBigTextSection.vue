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
      class="bg-dark description--shortened"
      theme="dark"
      :aboveLine="false"
      :mobileReplaceImage="false"
      :reverseImage="false"
      :title="textImageSections[0].title"
      :description="textImageSections[0].text"
      :image="textImageSections[0].image.filename"
    />
    <DiversityTextImageSection
      class="bg-dark description--shortened"
      theme="dark"
      :aboveLine="false"
      :mobileReplaceImage="false"
      :reverseImage="true"
      :description="textImageSections[1].text"
      :image="textImageSections[1].image.filename"
      :center="true"
    />
    <DiversityFactsSection class="bg-dark description--shortened" :sidebar_title="content?.facts_title" :facts="content.facts"/>
    <DiversityComiteeSection
        ref="comitee"
        v-intersect="{handler: onIntersectSection, options: { threshold: [ 0.2, 0.5, 1.0] }}"
        data-section="comitee"
        :title="content?.comitee_header"
        :sidebar_title="content?.comitee_title"
        :photos="comiteeSlider?.map(teaser => ({
          editableBlock: teaser,
          image: teaser.image?.filename,
          heading: teaser.text,

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

import DiversityComiteeSection from "@/components/SustainabilitySection";
import DiversityBigTextSection from "@/components/BigTextSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";
import DiversityTextImageSection from "@/components/DiversityTextImageSection";
import DiversityFactsSection from "@/components/DiversityFactsSection";

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "DiversityBigText",
  mixins: [intersectionMixin],
  components: {
    DiversityBigTextSection,
    DiversityTextImageSection,
    DiversityFactsSection,
    DiversityComiteeSection,
    TeamSection,
    FooterSection,
  },
  data: () => ({
    story: null,
  }),
  async created() {
    this.story = await useStoryblok("careers/diversity", {
      version: "draft",
    });
  },

  computed: {
    content() {
      return this.story?.content;
    },

    hero() {
      return this.content?.hero;
    },

    textImageSections() {
      return this.content?.diversity_image_text;
    },

    comiteeSlider(){
      return this.content?.Slider
    },

    teamVideos() {
      return this.content?.team_image_video;
    },
  },

  watch: {
    story() {
      console.log(this.story.content);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/big_text_with_image";
</style>
