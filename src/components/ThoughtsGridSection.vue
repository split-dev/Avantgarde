<template>
  <SectionPrototype container-class-name="thoughts-grid-container" class-name="thoughts-grid" above-line content-center :theme="theme">
    <v-col cols="12">
      <h1 class="title-great thoughts-heading">{{heading}}</h1>
    </v-col>
    <div class="w-100 thoughts-grid-list">
      <v-row :class="(row % 2 === 0) ? 'flex-md-row-reverse' : ''" v-for="row in Math.ceil(stories.length / 3)" :key="row">
        <v-col
            v-for="(card, idx) in stories.slice(((row - 1) * 3), ((row - 1) * 3) + 3)"
            :key="card.slug"
            cols="12"
            :sm="6"
            :md="(idx % 3 === 0) ? 5 : ((idx % 3 === 1) ? 3 : 4)">
          <i18n-link :to="`/thoughts/${card.slug}`" class="text-decoration-none">
            <v-card flat rounded="0">
              <v-img
                  :src="card.content?.list_view_image?.filename"
                  height="442px"
              >
              </v-img>
              <v-card-title class="title-h3" v-text="card.content?.list_view_title"></v-card-title>
              <v-card-text class="body-text text-black" v-text="card.content?.list_view_intro"></v-card-text>
            </v-card>
          </i18n-link>
        </v-col>
      </v-row>
    </div>
    <div
      v-if="this.total - this.stories?.length"
      class="mx-auto mb-10 load-btn-container"
    >
      <v-btn
        :ripple="false" text plain tile
        class="load-btn dark--text body-pre-text"
        @click="page++"
      >
        {{ $t('load_more' )}}
      </v-btn>
      <span class="load-page">
        {{ countToLoad }}
      </span>
    </div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import { useStoryblokApi } from '@storyblok/vue-2';

const storyblokApi = useStoryblokApi();

export default {
  name: "ThoughtsGridSection",

  components: {
    SectionPrototype
  },

  props: {
    theme: {
      type: String
    },
    heading: {
      type: String
    }
  },

  data: () => ({
    page: 0,
    pageLength: 9,
    stories: [],
    total: 0,
  }),

  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.loadThoughts(val + 1);
      },
    },
  },

  computed: {
    countToLoad() {
      const moreStoriesCount = this.total - this.stories?.length;
      return moreStoriesCount > this.pageLength ? this.pageLength : moreStoriesCount;
    },
  },

  methods: {
    async loadThoughts(page) {
      const { data, total } = await storyblokApi.get('cdn/stories/', {
        'filter_query[component][in]': 'ThoughtDetailTemplate',
        starts_with: 'thoughts',
        per_page: this.pageLength,
        page: page,
        ...this.storyOptions,
      });
      this.stories = [...this.stories, ...data?.stories];
      this.total = total;
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.thoughts-grid {
  ::v-deep &-container {
    padding: 39px 0 100px 0;
    @media (max-width: $media-sm) {
      padding: 0 0;
    }
  }
}

.thoughts-heading {
  line-height: 197px;
  padding: 0 140px 80px 140px;
  border-bottom: 1px solid $border-color;
  @media (max-width: $media-md) {
    line-height: 1.2;
  }
  @media (max-width: $media-sm) {
    line-height: 59px;
    padding: 30px 30px 42px 36px;
  }
}
.thoughts-grid-list {
  .row {
    padding: 70px 140px 100px 140px;
    &:not(:last-child) {
      border-bottom: 1px solid $border-color;
    }
    @media (max-width: $media-sm) {
      padding: 50px 36px 12px 36px;
      &:last-child {
        padding-bottom: 24px;
        border-bottom: 1px solid $border-color;
      }
    }
  }
  .col-md-3, .col-md-4 {
    .v-card, .v-image {
      max-width: 396px;
      margin: 0 auto;
      @media (max-width: $media-sm) {
        max-width: 100%;
      }
    }
  }
  .col-md-5 {
    .v-card, .v-image {
      max-width: 672px;
      margin: 0 auto;
      @media (max-width: $media-sm) {
        max-width: 100%;
      }
    }
  }
  .v-card__title, .v-card__text {
    color: $dark-text;
  }
  .v-card__title {
    white-space: pre-wrap;
    word-break: break-word;
    padding: 30px 0 20px 0;
    @media (max-width: $media-sm) {
      font-size: 35px;
      line-height: 41px;
      padding-top: 7px;
      padding-bottom: 12px;
    }
  }
  .v-card__text {
    padding: 0 0;
  }
  @media (max-width: $media-sm) {
    .col-12 {
      margin-bottom: 26px;
    }
  }
}
.load-btn {
  font-size: 30px !important;
  letter-spacing: 0;
  padding: 0 0;
  vertical-align: baseline;
  text-transform: none;
  ::v-deep .v-btn__content {
    line-height: 80px;
    font-size: 30px;
    opacity: 1 !important;
    color: $dark-text !important;
  }
}
.load-page {
  display: inline-block;
  width: 80px;
  height: 80px;
  background-color: $cyan-color;
  color: $dark-text;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
}

@media (max-width: $media-sm) {
  .load-btn-container {
    margin-top: 62px;
    margin-bottom: 50px !important;
  }
}

</style>
