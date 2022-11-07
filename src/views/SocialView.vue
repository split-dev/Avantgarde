<template>
    <div class="page" ref="socialPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
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
        :title="TextImage.heading" 
        :description="TextImage.content" 
        :image="TextImage.image"
      />
      <TextImageSection 
        class="bg-dark description--shortened"
        theme="dark"
        :aboveLine="false"
        :mobileReplaceImage="false" 
        :reverseImage="true"
        :title="TextImage2.heading" 
        :description="TextImage2.content" 
        :image="TextImage2.image"
        :linkLabel="TextImage2.link.label"
        :linkUrl="TextImage2.link.url"
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
  name: "SocialPage",
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
          text: 'Social'
        }
      ],
      image: 'https://a.storyblok.com/f/177709/1088x818/7939795f4f/social-hero.jpg'
    },
    TextImage: {
      heading: 'Social responsibility',
      content: 'We firmly believe that our employees are the most important factor in the success of our company. At the same time, we demand great commitment from our employees and share business success with them in return. Within our internal Code of Conduct we have compiled the guidelines for treating each other with respect.',
      image: 'https://a.storyblok.com/f/177709/814x890/de25402124/social-1.jpg'
    },
    TextImage2: {
      heading: 'Diversity',
      content: 'Diversity and inclusion is at the core of Avantgarde’s history and DNA. Embracing and empowering people of all walks of life makes us a better service partner to our customers, it sparks our internal level of creativity and innovation as well as boosting multi perspectives enabling us to deliver the best products and services. We proactively sponsor DE&I activities in our company culture enabling and allowing all voices to surface and help Avantgarde be a place of belonging and zeitgeist.',
      image: 'https://a.storyblok.com/f/177709/814x890/f373acf828/social-2.jpg',
      link: {
        label: 'Learn more',
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
