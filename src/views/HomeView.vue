<template>
  <div
    class="page page--main"
    ref="homePage"
    :data-active-views="activeViewsString"
    @wheel="onWheelFooter"
  >
    <div
      v-if="!$vuetify.breakpoint.mobile"
      ref="animationBackdrop"
      class="animation-backdrop"
    />

    <IntroSection
      data-section="intro"
      theme="light"
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.5] },
      }"
      v-editable="hero"
      :image="hero.img_src"
      :title="hero.title"
      :subline="hero.subline"
      :label="hero.link_label"
      :url="hero.link_url"
    />
    <ImageBlocksSection
      theme="dark"
      data-section="services"
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.2, 0.5, 0.8, 1.0] },
      }"
      v-editable="servicesImagesBlocks"
      :sidebarTitle="servicesImagesBlocks.sidebar_title"
      :label="servicesImagesBlocks.label"
      :blocks="servicesImagesBlocks.blocks"
      v-model="servicesImagesBlocks.blocks"
    />
    <CtaSection
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.2, 0.5, 1.0] },
      }"
      data-section="solutions"
      class="cta--bordered"
      v-editable="ctaData"
      :title="ctaData.title"
      :description="ctaData.description"
      :image="ctaData.image"
      :imageMobile="ctaData.imageMobile"
      :url="ctaData.url"
      :label="ctaData.label"
    />
    <WorkSection
      class="work-carousel-section"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.5, 1.0] }}"
      data-section="work"
      v-editable="workSlides"
      :title="workSlides.title"
      :blocks="workSlides.blocks"
    />
    <BigTextSection
      lineType="1"
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"
      data-section="big-text"
      v-editable="richText"
      :text="bigText"
    />
    <LocationsSection
      ref="locations"
      v-intersect="{handler: onIntersectSection, options: { threshold: [ 0.0, 0.2, 0.5, 1.0] }}"
      data-section="locations"
      v-editable="locationsData"
      :image="locationsData.image"
      :sidebar_title="locationsData.sidebar_title"
      :locations-list="locationsData.blocks"
    />
    <SingleVideoSection
      v-if="video.videoSrc"
      class="video-section bg-dark"
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"
      data-section="video"
      v-editable="video"
      :video="video.videoSrc"
      :poster="video.videoPreview"
    />
    <ThoughtsSection
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"
      data-section="thoughts"
      v-editable="thoughtsData"
      :title="thoughtsData.title"
      :label="thoughtsData.linkLabel"
      :verticalTitle="thoughtsData.verticalTitle"
      :blocks="thoughtsData.blocks"
      class="bg-white"
    />
    <TeamSection
      v-intersect="{
        handler: onIntersectSection,
        options: { threshold: [0.0, 0.2, 0.5, 0.8, 1.0] },
      }"
      ref="teamSection"
      data-section="team"
      :title="teamData.title"
      :description="teamData.content"
      :image="teamData.image"
      :cta-label="teamData.linkLabel"
      :cta-url="teamData.linkUrl"
      :photos="teamData.blocks"
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
  import IntroSection from "@/components/IntroSection";
  import ImageBlocksSection from "@/components/ImageBlocksSection";
  import CtaSection from "@/components/CtaSection";
  import FooterSection from "@/components/FooterSection";
  import TeamSection from "@/components/TeamSection";
  import ThoughtsSection from "@/components/ThoughtsSection";
  import SingleVideoSection from "@/components/SingleVideoSection";
  import LocationsSection from "@/components/LocationsSection";
  import WorkSection from "@/components/WorkSection";
  import BigTextSection from "@/components/BigTextSection";
  import { intersectionMixin } from "@/mixins/IntersectionMixin";

  /* https://greensock.com/docs/ */
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  import { useStoryblok } from "@storyblok/vue-2";

export default {
  name: 'HomePage',
  mixins: [intersectionMixin],
  components: {
    WorkSection,
    BigTextSection,
    LocationsSection,
    SingleVideoSection,
    ThoughtsSection,
    IntroSection,
    ImageBlocksSection,
    CtaSection,
    FooterSection,
    TeamSection
  },
  data:() => ({
    story: null,
    tl: null,
    pages: [],
    hero: {},
    richText: '',
    servicesImagesBlocks: [],
    workSlides: {},
    ctaData: {},
    video: {},
    locationsData: {},
    thoughtsData: {},
    teamData: {},
  }),
  beforeDestroy() {
    this.tl?.pause(0).kill(true);
    this.tl = null;
  },
  async created() {
    this.story = await useStoryblok('home', { ...this.storyOptions });
  },
  watch: {
    story(val) {
      if (!val) return;
      this.setContent();
    },
  },
  mounted() {
    if (this.$vuetify.breakpoint.mobile) return;

    const animationBackdrop = this.$refs.animationBackdrop;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(animationBackdrop, {
      opacity: 0,
      marginTop: 0,
    });

    this.tl?.pause(0).kill(true);
    this.tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.$refs.homePage,
        scrub: true,
        start: 'top top',
        end: 'bottom',
      }})
        .set(animationBackdrop, {
          left: 'initial',
          right: '0',
          opacity: 0,
          marginTop: (this.$vuetify.breakpoint.mobile ? '32px' : '0'),
        }, 0)
        this.tl.to(animationBackdrop, {
          opacity: .75,
          duration: (this.$vuetify.breakpoint.mobile ? 10 : 0),
        })
        this.tl.to(animationBackdrop, {
          width: '100vw',
          height: '100vh',
          marginTop: 0,
          left: 'initial',
          right: '0',
          opacity: 1,
          background: 'rgba(20, 19, 19, 1)',
          duration: 60
        })
        .set(animationBackdrop, {
          left: 0,
          right: 'auto'
        }, 100)
        .to(animationBackdrop, {
          width: '100vw',
          duration: 60
        }, 290);
  },

  methods: {
    setContent() {
      const HERO_COMPONENT_NAME = "headerblok",
          CTA_COMPONENT_NAME = "cta",
          IMAGE_BLOCKS_COMPONENT_NAME = "image blocks",
          LARGE_CAROUSEL_COMPONENT_NAME = "large carousel",
          RICH_TEXT_COMPONENT_NAME = "rich text",
          IMAGE_LINK_BLOCKS_COMPONENT_NAME = "image & link blocks",
          VIDEO_COMPONENT_NAME = "video",
          CAROUSEL_COMPONENT_NAME = "carousel",
          ANIMATED_CTA_COMPONENT_NAME = "animated cta";
      this.story.content.body.forEach((block) => {
        switch (block.component.toLowerCase()) {
          case HERO_COMPONENT_NAME:
            this.hero = {
              title: block.title,
              subline: block.subline,
              img_src: block.image.filename,
              img_alt: block.image.alt,
              link_label: block.linkLabel,
              link_url: block.linkUrl,
            };
            break;
          case IMAGE_BLOCKS_COMPONENT_NAME:
            this.servicesImagesBlocks = {
              sidebar_title: block.Title,
              label: block.Label,
              blocks: block.Image.map((img) => {
                return {
                  title: img.Text,
                  link: this.removeSpaces(img.Text),
                  img_src: img.Image.filename,
                  img_alt: "#",
                };
              }),
            };
            break;
          case CTA_COMPONENT_NAME:
            this.ctaData = {
              title: block.Title,
              description: block.Content,
              image: block.Image_desktop.filename,
              imageMobile: block.Image_mobile.filename,
              label: block.Link_label,
              url: block.Link_URL.url || block.Link_URL.cached_url,
            };
            break;
          case LARGE_CAROUSEL_COMPONENT_NAME:
            this.workSlides = {
              title: block.Title,
              blocks: block.Slide.map((slide) => {
                return {
                  title: slide.Content,
                  img_src: slide.Image.filename,
                  img_alt: slide.Image.alt,
                  label: slide.Label || "Learn more",
                  url: slide.URL,
                };
              }),
            };
            break;
          case RICH_TEXT_COMPONENT_NAME:
            this.richText = block.Text;
            break;
          case IMAGE_LINK_BLOCKS_COMPONENT_NAME:
            this.locationsData = {
              sidebar_title: block.Title,
              image: block.Image.filename,
              blocks: block.Block,
            };
            break;
          case VIDEO_COMPONENT_NAME:
            this.video = {
              videoSrc: block.Video.filename,
              videoPreview: block.videoPreview.filename,
            };
            break;
          case CAROUSEL_COMPONENT_NAME:
            this.thoughtsData = {
              title: block.Heading,
              linkLabel: block.Label || "Learn more",
              verticalTitle: block.Sidebar_title,
              linkUrl: block.URL.url,
              blocks: block.Slides.map((slide) => {
                return {
                  title: slide.Heading,
                  image: slide.Image.filename,
                  img_alt: slide.Image.alt,
                  intro: slide.Content.content[0].content[0].text,
                };
              }),
            };
            break;
          case ANIMATED_CTA_COMPONENT_NAME:
            this.teamData = {
              title: block.Heading,
              content: block.Content,
              image: block.Image.filename,
              linkUrl: block.URL.cached_url,
              linkLabel: block.Label || "Learn more",
              blocks: block.TeamVideo.map((slide) => {
                return {
                  video: slide.video.filename,
                  image: slide.placeholder_image.filename,
                };
              }),
            };
            break;
        }
      });
    }
  },

  computed: {
    bigText() {
      return this.interpolateString(this.richText || '');
    },
  }
};
</script>
