<template>
  <div v-editable="story?.content">
    <SectionPrototype :vertical-title="story?.content.verticalTitle">
      <div class="
        tw-my-5 tw-mt-10 tw-px-4
        lg:tw-pl-20 lg:tw-pr-16
        xl:tw-max-w-7xl
      ">
        <template v-if="options.length">
          <span
            class="
              tw-text-right tw-ml-auto tw-block tw-max-w-max 
              tw-transition-all tw-duration-300 tw-border-[#b5b5b5] tw-mb-2
            "
            v-for="({ label, value }, i) in options"
            :key="i"
            :class="{ 'tw-border-b tw-font-bold': selected === value }"
            @click="selected = value"
          >
            {{ label }}
          </span>
        </template>
        <div
          class="imprint"
          v-html="renderRichText(section.Content)"
        ></div>
      </div>
    </SectionPrototype>
    <FooterSection ref="footer" v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}" data-section="footer"/>
    <div class="left-line"></div>
  </div>
</template>

<script>
import { useStoryblok, renderRichText } from "@storyblok/vue-2";
import { intersectionMixin } from "@/mixins/IntersectionMixin";

import FooterSection from '@/components/FooterSection';
import SectionPrototype from '@/components/SectionPrototype';

export default {
  mixins: [intersectionMixin],

  components: {
    FooterSection,
    SectionPrototype,
  },

  data: () => ({
    story: null,
    selected: null,
  }),

  async created() {
    this.story = await useStoryblok(this.$route.name, { ...this.storyOptions });
  },

  computed: {
    section() {
      if (!this.story) return {};
      if (this.story.content.sections.length === 1) return this.story.content.sections[0];
      return this.selected
        ? this.story.content.sections.find(({ title }) => this.removeSpaces(title, '-') === this.selected)
        : this.story.content.sections[0];
    },

    options() {
      if (!this.story || this.story.content.sections.length === 1) return [];
      return this.story.content.sections.map(({ title }) => ({
        label: title, 
        value: this.removeSpaces(title, '-'),
      }));
    }
  },

  watch: {
    story() {
      if (this.story && this.story.content.sections.length > 1) {
        this.selected = this.removeSpaces(this.story.content.sections[0].title, '-');
      }
    },
  },

  methods: {
    renderRichText,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .vertical-text h2 {
  height: max-content;
}
.imprint {
  @apply tw-text-lg tw-w-[calc(100vw-92px)] lg:tw-text-xl xl:tw-w-full;
  
  ::v-deep {
    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }

    ul, ol {
      @apply tw-mb-5;

      li p {
        @apply tw-my-0;
      }
    }

    h1 {
      @apply tw-text-5xl lg:tw-text-7xl;
    }

    p {
      @apply tw-my-5;
    }
  }
}
</style>
