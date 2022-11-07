<template>
    <div class="page" ref="governancePage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
      <BigTextSection 
        theme="light" 
        class-name="big-text-with-image text-center" 
        v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] }}" 
        :centered="true"
        no-animated
        :text="Hero.heading">
        <v-img
          eager
          :src="Hero.image"
          class="position-absolute z-behind"
          width="56vw"
          :max-width="$vuetify.breakpoint.mobile ? '' : '1088px'"  
        />
      </BigTextSection>
      <TextImageSection 
        class="bg-dark description--shortened"
        theme="dark"
        :aboveLine="false"
        :mobileReplaceImage="false" 
        :reverseImage="true"
        :title="TextImage.heading" 
        :description="TextImage.content" 
        :image="TextImage.image"
        :linkLabel="TextImage.link.label"
        :linkUrl="TextImage.link.url || TextImage.link.cached_url"
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

export default {
  name: "GovernancePage",
  mixins: [intersectionMixin],
  components: {
    BigTextSection,
    TextImageSection,
    FooterSection
  },
  data: () => ({
    Hero: {
      heading: [
        {
          color: '#98fcce',
          text: 'Governance'
        }
      ],
      image: 'https://a.storyblok.com/f/177709/1088x818/75ea6645e4/governance-hero.jpg'
    },
    TextImage: {
      heading: 'Ethical business practices',
      content: 'We conduct our business with the greatest possible integrity and according to ethical principles. We expect the same from all our business partners. Our internal Code of Conduct as well as our Code of Conduct for suppliers governs our understanding of integrity in business and the protection of personal data.',
      image: 'https://a.storyblok.com/f/177709/814x890/67fa000a8a/governance-1.jpg',
      link: {
        label: 'Code of Conduct',
        url: '#'
      }
    }
  })
}
</script>
  
<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/big_text_with_image";
</style>
