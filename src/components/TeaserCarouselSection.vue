<template>
  <SectionPrototype
    :verticalTitle="verticalTitle"
    :theme="theme"
    className="teaser-carousel-blocks"
    class="sm:tw-pb-[170px] lg:tw-pb-[300px]"
  >

    <div class="
      tw-ml-[43px] tw-pr-[43px] tw-mt-[50px]
      lg:tw-pr-[120px]
      lg:tw-ml-[22vw] lg:-tw-mr-[160px] lg:tw-mt-[211px]
      lg:-tw-translate-x-[160px]
    ">
      <div class="title-h1">
        {{ title }}
      </div>

      <div class="
        tw-max-w-[704px] tw-text-[18px] tw-mt-[24px]
      ">
        {{ copy }}
      </div>
    </div>

    <CarouselBlock
      :identifier="`${title}-carousel`"
      :gap="$vuetify.breakpoint.mobile ? 10 : 62"
      type="custom"
      class="
        tw-my-[96px]
        md:tw-pr-[21vw]
        lg:tw-ml-[22vw] lg:-tw-mr-[160px] lg:tw-mt-[180px]
        lg:-tw-translate-x-[160px]
        lg:tw-w-[70vw]
      ">
      <div
        v-for="slide in blocks"
        v-editable="slide.editableBlock"
        :key="slide.key"
        class="
          swiper-slide
          tw-h-auto
          lg:tw-max-h-[817px]
          lg:tw-max-w-[70vw] lg:tw-w-[70vw]
          tw-bg-[#121212] tw-text-[#fff]
        ">
        <div class="
          tw-flex
          tw-flex-col
          lg:tw-flex-row
          lg:tw-h-full
        ">
          <v-img
            :src="slide.image"
            max-width="100%"
            cover eager
            class="
              tw-shrink
              tw-max-h-[500px]
              lg:tw-max-h-full
              lg:tw-h-auto
              lg:tw-basis-7/12
            "/>

          <div class="
            tw-shrink-0
            tw-basis-5/12
            lg:tw-basis-5/12
            lg:tw-self-center
          ">
            <div class="
              tw-my-[50px] tw-mx-[20px]
              lg:tw-mx-[50px]
            ">
              <div class="title-h1">
                {{ slide.title }}
              </div>
              <div class="
                tw-mt-[25px]
                lg:tw-ml-[72px] lg:tw-mt-[50px]
                lg:tw-max-w-[328px]
              ">
                {{ slide.copy }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </CarouselBlock>
    <div class="line-bg
      tw-hidden
      lg:tw-block
    " />
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import CarouselBlock from '../components/bloks/CarouselBlock';

export default {
  name: "TeaserCarouselSection",
  props: {
    title: {
      type: String
    },
    copy: {
      type: String
    },
    verticalTitle: {
      type: String
    },
    theme: {
      type: String
    },
    blocks: {
      type: Array
    }
  },
  components: {
    SectionPrototype,
    CarouselBlock
  },
  data: () => ({
  }),
}
</script>


<style lang="scss">
  @import "../assets/styles/variables";

  .teaser-carousel-blocks {

    .container {
      max-width: calc(100% - 160px);
      padding: 0;
    }

    .flex-fill.h-100 {
      height: auto !important;
    }

    .paging-label {
      position: absolute;
      left: 120px;
      top: 956px;
    }

    @media (max-width: $media-sm) {
      .container {
        max-width: calc(100% - 60px);
      }

      .paging-label {
        top: 46px;
        right: 35px;
        right: calc(32vw - 76px - 43px);
        left: auto;
      }
    }

    @media (max-width: $media-xs) {
      padding-bottom: 0;
    }

    .line-bg {
      pointer-events: none;
      content: '';
      position: absolute;
      background-image: url("data:image/svg+xml,%3Csvg width='1420' height='1681' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(-11 710 841)'%3E%3Cpath d='M-145.255 1530.392s16.998-201.252 233.496-190.882c216.499 10.37 403.605 178.568 555.613 166.378 152.008-12.19-11.623-271.287 178.313-369.588 189.936-98.302 353.99-139.321 273.233-355.41-80.758-216.089 212.753-608.741 470.658-628.502' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
      background-position: left bottom;
      width: 84%;
      height: 50%;
      background-position: left bottom;
      background-size: auto;
      right: 0;
      bottom: 0;
      transform: translate(0, 12.5%) scaleY(0.75);
    }
  }
</style>
