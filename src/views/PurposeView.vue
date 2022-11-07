<template>
  <div
    class="page"
    ref="diversityPage"
    :data-active-views="activeViewsString"
    @wheel="onWheelFooter"
  >
    <PurposeBigTextSection
      :verticalTitle="content?.Side_Text_hero"
      class-name="big-text-with-image text-center padding-small"
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"

      :text="interpolateString(`**${content?.Header_Hero}**`)"
    >
      <v-img
        :src="content?.Image_Hero?.filename"
        class="position-absolute z-behind tw-mt-[-150px]"
        width="56vw"
        :max-width="$vuetify.breakpoint.mobile ? '' : '1088px'"
      />

    </PurposeBigTextSection>
    <p class="xl:tw-w-[1088px] xl:tw-ml-[305px] xl:tw-mt-[100px] tw-text-[30px] tw-leading-[42px] tw-pb-[100px]  tw-bg-white md:tw-bg-transparent z-behind">{{content?.Text_Hero}}</p>
    <PurposePrinciplesSection
      class="bg-dark "
      class-name="big-text-with-image text-center "
      :verticalTitle="content?.Side_Text_Principles"
      no-animated
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText(content?.Principle1)"
    />
    <PurposePrinciplesSection
      class="bg-dark "
      class-name="big-text-with-image text-center "
      :verticalTitle="''"
      no-animated
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText(content?.Principle2)"
    />
    <PurposePrinciplesSection
      class="bg-dark "
      class-name="big-text-with-image text-center "
      :verticalTitle="''"
      no-animated
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText(content?.Principle3)"
    />
    <PurposePrinciplesSection
      class="bg-dark "
      class-name="big-text-with-image text-center"
      :verticalTitle="''"
      no-animated
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText(content?.Principle4)"
    />
    <PurposePrinciplesSection
      class="bg-dark "
      class-name="big-text-with-image text-center "
      :verticalTitle="''"
      no-animated
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText(content?.Principle5)"
    />
    <PurposePrinciplesSection
      class="bg-dark tw-text-left"
      class-name="big-text-with-image  "
      :verticalTitle="''"
      no-animated
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="bigText(content?.Principle6)"
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

import PurposeBigTextSection from "@/components/PurposeBigTextSection";
import PurposePrinciplesSection from "@/components/PurposePrinciplesSection";
import FooterSection from "@/components/FooterSection";

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "PurposePage",
  mixins: [intersectionMixin],
  components: {
    PurposeBigTextSection,
    PurposePrinciplesSection,
    FooterSection,
  },
  data: () => ({
    story: null,
  }),
  async created() {
    this.story = await useStoryblok("careers/purpose", {
      version: "draft",
    });
  },

  methods:{
    bigText(text) {
      return this.interpolateString(text || '');
    },
  },

  computed: {
    content() {
      return this.story?.content;
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

.big-text-with-image {
  z-index: 0;
  text-align: left !important;
}
</style>
