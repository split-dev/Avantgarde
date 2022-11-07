<template>
  <SectionPrototype
    :verticalTitle="verticalTitle || 'thoughts'"
    content-center
    class-name="thoughts-section"
    above-line
    container-class-name="thoughts-carousel-block"
  >
    <v-col
      class="d-flex flex-column justify-start justify-md-center align-start"
      cols="12"
      lg="3"
      md="4"
    >
      <h2 class="title-h2">
        {{ title }}
      </h2>
      <i18n-link
        :to="url || '/thoughts'"
        class="arrow-link text-decoration-none"
      >
        {{ label || "Learn more" }}
      </i18n-link>
    </v-col>

    <v-col cols="12" lg="9" md="8">
      <div class="thoughts-carousel">

        <b class="paging-label body-text d-block">
          {{ currPage }}
        </b>

        <CarouselBlock
          identifier="thoughts"
          hidePager
          :gap="$vuetify.breakpoint.mobile ? 23 : 30"
          type="custom"
          @change="sliderChange"
        >
         <component
            :is="thought.slug ? 'i18n-link' : 'div'"
            v-for="(thought, index) in blocks"
            :key="index"
            :to="thought.slug ? `/thoughts/${thought.slug}` : null"
            class="swiper-slide text-decoration-none bg-white"
          >
            <v-img :src="thought.image" cover eager class="bg-white"></v-img>
            <h3 class="title-h3 dark--text">{{thought.title}}</h3>
            <p class="dark--text">{{thought.intro}}</p>
          </component>
        </CarouselBlock>

      </div>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import CarouselBlock from "../components/bloks/CarouselBlock";

export default {
  name: "ThoughtsSection",

  props: {
    title: {
      type: String,
    },
    label: {
      type: String,
    },
    url: {
      type: String,
    },
    verticalTitle: {
      type: String,
    },
    blocks: {
      type: Array,
    },
  },

  components: {
    SectionPrototype,
    CarouselBlock,
  },

  data: () => ({
    currPage: "",
  }),

  methods: {
    sliderChange(currPage) {
      this.currPage = currPage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

::v-deep .thoughts-section {
  margin-top: 155px;
  border-top: 1px solid #b5b5b5;
  box-shadow: 0px -155px 0px 0px white;
  overflow: visible;
}
::v-deep .thoughts-carousel-block {
  padding: 0 0 0 106px;
  border-left: 1px solid $border-color;
  max-width: calc(100vw - 160px);
  @media (max-width: $media-sm) {
    max-width: calc(100vw - 60px);
  }
  .title-h2 {
    margin-bottom: 170px;
  }
  .arrow-link {
    margin-left: 107px;
  }

  .thoughts-carousel {
    padding-left: 60px;
    max-width: 100%;
    height: 100%;
    @media (max-width: $media-sm) {
      padding-left: 0;
      margin-top: 118px;
    }
  }
  .swiper {
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    padding-right: 30px;
    @media (max-width: $media-sm) {
      border-left: 0;
      padding-left: 22px;
    }
  }
  .swiper-wrapper {
    .swiper-slide {
      border-left: 1px solid $border-color;
      padding-top: 33px;
      padding-bottom: 142px;
      width: 426px;
      align-self: stretch;
      height: auto;
      .v-image {
        height: 545px;
      }
      .v-image__image {
        max-width: 396px;
        max-height: 443px;
        height: 443px;
        top: 102px;
        left: 30px;
        transform-origin: top left;
        transition: transform ease-in-out 600ms;
      }
      h3,
      p {
        padding: 27px 32px 0 32px;
      }
      p {
        padding-top: 12px;
        font-size: 18px;
        line-height: 22px;
      }
      &:first-child {
        border-left: 0;
      }
      &:hover {
        .v-image__image {

          transform: scale(1.1);
        }
      }
      @media (max-width: $media-sm) {
        padding-bottom: 50px;
        padding-top: 0;
        .v-image {
          height: 276px;
        }
        .v-image__image {
          top: 0;
        }
      }
      @media (max-width: $media-xs) {
        border-left: 0;
        width: 100%;
        max-width: 70vw;
        .v-image__image {
          left: 0;
        }
      }
    }
  }
  .paging-label {
    text-align: right;
    padding-right: 138px;
    position: absolute;
    width: 100%;
    right: 0;
    margin-top: -57px;
    @media (max-width: $media-sm) {
      padding-right: 27px;
    }
  }

  @media (max-width: 1140px) {
    padding-left: 42px;
  }
  @media (max-width: 1600px) {
    .arrow-link {
      margin-left: 0;
    }
  }
  @media (max-width: $media-md) {
    padding-top: 106px;
    padding-left: 0;
    .title-h2 {
      padding-left: 42px;
      margin-bottom: 63px;
    }
    .arrow-link {
      margin-left: 57px;
    }
    .row {
      border-top: 1px solid $border-color;
    }
  }
  @media (max-width: $media-sm) {
    padding-top: 48px;
    .row {
      border-top: 0;
    }
  }
}

@import "./src/assets/styles/animations/thoughts_slide";
</style>
