<template>
  <SectionPrototype verticalTitle="" className="bigtextimages-section" container-class-name="bigtextimages-section-container" :theme="theme">
    <v-col cols="12">
      <div class="
        tw-mt-[58px] tw-mb-[20px]
        lg:tw-mt-[175px] lg:tw-mb-[51px]
      ">
        <div
          v-for="(item, idx) in blocks"
          v-editable="item.editableBlock"
          :key="`big-text-${idx}`"
          class="
            tw-block
            tw-w-full
            tw-cursor-pointer
            tw-mt-[91px]
            lg:tw-mt-[80px]
          "
          @click="select(`big-text-${idx}`)"
        >
          <div
            class="
              big-text events-none
              tw-mb-[20px]
            "
            v-html="interpolateString(item.title)"
          />

          <Transition name="slide-fade">
            <div v-show="`big-text-${idx}` === selected">
              <div class="
                border-cyan
                tw-text-[18px]
                tw-border-b-4
                lg:tw-inline
                lg:tw-text-[25px]
              ">
                {{ item.copy }}
              </div>

              <div class="
                tw-mt-[30px] tw-mr-[-22px]
                tw-flex
                tw-overflow-scroll
                md:tw-mr-[-36px]
                lg:tw-max-w-[1180px]
                lg:tw-mt-[38px]
                xl:tw-mr-[-153px]
              ">
                <div
                  v-for="image in item.images"
                  :key="image.id"
                  class="
                    tw-w-[205px]
                    tw-pr-[10px]
                    odd:tw-mt-[16px]
                    md:[&:nth-child(3n)]:tw-mt-[0]
                    md:[&:nth-child(3n)]:tw-w-[298px]
                    md:[&:nth-child(3n+1)]:tw-mt-[16px]
                    md:[&:nth-child(3n+1)]:tw-w-[333px]
                    md:[&:nth-child(3n+2)]:tw-mt-[44px]
                    md:[&:nth-child(3n+2)]:tw-w-[332px]
                    xl:tw-pr-[0]
                    xl:tw-mr-[100px] xl:last:tw-mr-[0]
                ">
                  <v-img
                    :src="image.filename"
                    class=""
                  />
              </div>
              </div>
            </div>
          </Transition>
        </div>

        <div class="
          tw-py-[20px]
          tw-mt-[58px]
          lg:tw-text-right
        ">
          <i18n-link
            v-if="ctaUrl"
            :to="ctaUrl"
            class="arrow-link
              tw-no-underline
          ">
            {{ ctaLabel || 'Learn more' }}
          </i18n-link>
        </div>
      </div>
    </v-col>

    <svg
      class="
        tw-hidden tw-absolute
        tw-z-[-1]
        tw-right-[0] tw-left-[0] tw-top-[-184px]
        md:tw-block" xmlns="http://www.w3.org/2000/svg" width="2035" height="1205" viewBox="0 0 2035 1205"><g><g transform="rotate(1 1018 603)"><path fill="none" stroke="#72fdda" stroke-miterlimit="20" stroke-width="2" d="M12.137 1222.457v0s19.983-180.952 274.468-171.627c254.487 9.324 474.426 160.555 653.106 149.596 178.681-10.96-13.663-243.922 209.601-332.306 223.265-88.387 416.106-125.267 321.176-319.558-94.927-194.29 250.087-547.333 553.247-565.102"/></g></g></svg>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';

export default {
  name: "BigTextImagesSection",

  components: {
    SectionPrototype,
  },

  props: {
    blocks: {
      type: Array
    },
    ctaLabel: {
      type: String
    },
    ctaUrl: {
      type: String
    },
    theme: {
      type: String
    },
  },

  data: () => ({
    selected: null
  }),

  methods: {
    select(item) {
      if (!item) return;
      this.selected = item;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/variables";

  .bigtextimages-section {
    overflow: visible;

    .container {
      padding: 0 60px 0 121px;
      max-width: calc(100% - 160px);

      @media (max-width: $media-md) {
        padding: 0 36px;
      }
      @media (max-width: $media-sm) {
        padding: 0 22px;
        max-width: calc(100% - 60px);
      }
    }

    .big-text {
      font-size: 175px;
      line-height: 1;
      white-space: pre-wrap;

      @media (max-width: 1600px) {
        font-size: 130px;
      }
      @media (max-width: $media-md) {
        font-size: 100px;
      }
      @media (max-width: $media-sm) {
        font-size: 50px;
      }

      span {
        color: $cyan-color;
      }
    }

    .border-cyan {
      border-color: $cyan-color;
    }
    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(1vw);
      opacity: 0;
    }
  }
</style>