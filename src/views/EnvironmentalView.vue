<template>
    <div class="page" ref="environmentalPage" :data-active-views="activeViewsString" @wheel="onWheelFooter">
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
  name: "EnvironmentalPage",
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
          text: 'Environmental'
        }
      ],
      image: 'https://a.storyblok.com/f/177709/1088x818/acedb61f57/environmental-hero.jpg'
    },
    TextImage: {
      heading: 'Climate',
      content: 'In 2020 our carbon footprint comprised 886t. We want to understand better how our emissions are composed and develop measures to reduce them, like switching to rail travel on business trips, promotion of the E-fleet or switching to renewable energies in all our offices. For the unavoidable remainder we chose three climate protection projects for compensation: improved kitchen regimes in Malawi, biogas plants in India and forest protection at the Luangwa in Zambia (Gold Standard and Verra certified).',
      image: 'https://a.storyblok.com/f/177709/814x890/70f7984366/environmental-1.jpg'
    },
    TextImage2: {
      heading: 'Resources',
      content: 'We pay attention to the sensitive use of resources, whether in the office or in our customer projects - from the purchase of sustainable products to the proper separation of waste.',
      image: 'https://a.storyblok.com/f/177709/814x890/fd489b0e6f/environmental-2.jpg'
    }
  })
}
</script>
  
<style scoped lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/big_text_with_image";
</style>
