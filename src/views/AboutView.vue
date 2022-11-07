<template>
  <div class="page" ref="aboutPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
    <BigTextSection
      theme="light"
      class-name="big-text-with-image text-center"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}"
      :centered="true"
      no-animated
      :text="interpolateString(`**${content?.hero_text || ''}**`)">
      <v-img
        eager
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
      titleType="h2"
      :aboveLine="false"
      :mobileReplaceImage="false"
      :title="block.title"
      :description="block.text"
      :image="block.image?.filename"
      :reverseImage="block.reverse"
      :linkLabel="block.cta_label"
      :linkUrl="block.cta_url?.url || block.cta_url?.cached_url"
    />

    <BigTextSection
      line-type="4"
      no-animated
      class="about-hover-section"
      className="bg-dark"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.5] }}"
      data-section="big-text"
      :text="$vuetify.breakpoint.mobile && content?.network_section_title_mobile
        ? interpolateString(content?.network_section_title_mobile)
        : interpolateString(content?.network_section_title)
      "
    >
      <ul class="hover-images-list spaced">
        <li
          v-for="linkItem in networkLinks"
          v-editable="linkItem"
          :key="linkItem.title"
          class="mb-md-6 hover-images-list-item"
        >
         <span class="!tw-z-10">{{linkItem.title}}</span>
          <v-img
            class="!tw-z-20"
            :src="linkItem.image?.filename"
            height="522px"
            min-width="55vw"
            :contain="$vuetify.breakpoint.mobile"
          />
          <div class="hover-images-list__content body-text text-left !tw-z-20">
            <p class="text-white">{{linkItem.description}}</p>
            <i18n-link
              :to="linkItem.link.url"
              target="_blank"
              class="arrow-link text-decoration-none body-text tw-mt-[25px]"
            >
              {{ $t('to_the_website' )}}
            </i18n-link>
          </div>
        </li>
      </ul>
    </BigTextSection>

    <SustainabilitySection
      ref="sustainability"
      v-intersect="{handler: onIntersectSection, options: { threshold: [ 0.2, 0.5, 1.0] }}"
      data-section="sustainability"
      theme="light"
      :image="content?.category_links_image?.filename"
      :title="content?.slider_section_title"
      :copy="content?.slider_section_copy"
      :sidebar_title="content?.slider_section_title_short"
      :locationList="categoryLinks?.map(cat => ({
        editableBlock: cat,
        heading: cat.title,
        headingMobile: cat.title_mobile,
        url: cat.link?.url || cat.link?.cached_url,
      }))"
      :photos="sliderTeasers?.map(teaser => ({
        editableBlock: teaser,
        image: teaser.image?.filename,
        heading: teaser.title,
        content: teaser.copy,
      }))"
    />

    <BigTextImagesSection
      :ctaLabel="content?.experts_section_cta_label"
      :ctaUrl="content?.experts_section_cta_url?.url || content?.experts_section_cta_url?.cached_url"
      :blocks="bigTextImageBlocks?.map(block => ({
        editableBlock: block,
        title: block.title,
        copy: block.copy,
        images: block.images,
      }))"
      class="bg-dark"
      theme="dark"
    />

    <TeamSection
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
import BigTextImagesSection from "@/components/BigTextImagesSection";
import TextImageSection from "@/components/TextImageSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: "AboutPage",

  mixins: [intersectionMixin],

  components: {
    BigTextSection,
    BigTextImagesSection,
    TextImageSection,
    SustainabilitySection,
    TeamSection,
    FooterSection,
  },

  data: () => ({
    story: null,
  }),

  async created() {
    this.story = await useStoryblok('about', { ...this.storyOptions });
  },

  computed: {
    content() {
      return this.story?.content;
    },

    textImageBlocks() {
      return this.content?.text_image_blocks;
    },

    networkLinks() {
      return this.content?.network_section_links;
    },

    categoryLinks() {
      return this.content?.category_links;
    },

    sliderTeasers() {
      return this.content?.slider_section_teasers;
    },

    teamVideos() {
      return this.content?.team_section_videos;
    },

    bigTextImageBlocks() {
      return this.content?.experts_section_bigtextimageblocks;
    },
  },
}
</script>

<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/big_text_with_image";
@import "./src/assets/styles/blocks/hover_images_list";
@import "./src/assets/styles/blocks/works_intro";
@import "./src/assets/styles/animations/big_intro_text_slide";

.about-hover-section {

  .hover-images-list {
    z-index: 1;
    li {
      a {
        color: $cyan-color;
        text-decoration: none;
      }
    }
  }

  @media (max-width: $media-md) {
    padding: 0;

    ::v-deep .big-text,
    .hover-images-list-item {
      padding: 30px 30px 50px 30px !important;
      border-bottom: 1px solid #b5b5b5;
    }
    .hover-images-list-item {
      line-height: 1;

      &:last-child {
        border: none;
      }
    }

    .hover-images-list__content {
      margin-top: 30px;
      color: white;
      -webkit-text-stroke: 0;
    }

    .arrow-link {
      margin-left: 20px;
    }
  }
}

::v-deep .locations-list {
  width: auto;
  .overlay {
    display: none !important;
  }
}

::v-deep .text-image-section .title-h2 {
  line-height: 1;
}

::v-deep .big-text {

  @media (min-width: $media-md) {
    font-size: 125px;
  }
}

::v-deep .hover-images-list li .hover-images-list__content {
  min-width: 55vw;

  @media (min-width: 1440px) {
    padding-left: 1vw;
    padding-right: 20vw;
  }
}

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
