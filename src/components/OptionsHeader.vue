<template>
  <div v-editable="blok" class="tw-bg-black tw-h-[calc(100vh-100px)]">
    <SectionPrototype
      theme="dark"
      vertical-title=""
      class="tw-h-[calc(100vh-100px)]"
    >
      <div class="
        tw-w-full tw-mt-12 tw-pl-5
        md:tw-mt-0 md:tw-flex md:tw-flex-col md:tw-h-full md:tw-justify-center
        xl:tw-pl-10 2xl:tw-pl-20
      ">
        <div
          class="
            tw-text-5xl
            tw-leading-snug
            md:tw-text-8xl md:tw-max-w-3xl
            xl:tw-text-[175px] xl:tw-max-w-5xl
            glow-text
          "
          v-html="interpolateString(blok.title)"
        ></div>

        <div class="
          tw-flex tw-flex-col
          md:tw-max-w-2xl md:tw-self-end md:tw-mr-10 md:tw-mt-16
          2xl:tw-max-w-5xl
        ">
          <div class="
            tw-text-4xl tw-mt-12 tw-inline
            2xl:tw-text-7xl
          ">
            {{ blok.subtitle }}
          </div>

          <div class="
            tw-flex tw-flex-col tw-gap-6 tw-mt-6
            md:tw-flex-row
          ">
            <div
              class="
                tw-py-4 tw-pl-8 tw-flex tw-items-center
                tw-border tw-border-white tw-cursor-pointer
                tw-w-[208px] tw-h-[80px]
                lg:tw-h-[90px] lg:tw-text-xl
                2xl:tw-w-[347px] 2xl:tw-h-[130px] 2xl:tw-text-3xl
              "
              v-for="(option, i) in blok.options"
              v-editable="option"
              :key="i"
              :class="{ 'tw-bg-[#98fcce] tw-text-black': option.selected }"
              @click="$emit('option-selected', option.value)"
            >
              {{ option.label }}
            </div>
          </div>
        </div>
      </div>
    </SectionPrototype>
  </div>
</template>

<script>
import SectionPrototype from './SectionPrototype.vue';

const DEFAULT_BLOK = {
  title: 'Title',
  subtitle: 'Subtitle...',
  options: [],
};

export default {
  components: {
    SectionPrototype,
  },

  props: {
    blok: {
      type: Object,
      default: () => ({ ...DEFAULT_BLOK }),
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.glow-text {
  span {
    color: $cyan-color;
  }
}
</style>