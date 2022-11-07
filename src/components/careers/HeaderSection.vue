<template>
  <SectionPrototype
    v-editable="header"
    :theme="theme"
    :container="false"
    :add-top-line="addTopLine"
    :vertical-title="header.verticalText || ''"
    class=" tw-w-screen"
  >
    <div
      class="
        tw-flex tw-flex-col tw-pl-8
        md:tw-h-relative md:tw-h-[80vh] md:tw-justify-center
      "
      v-editable="header"
    >
      <div class="md:tw-max-w-lg lg:tw-max-w-4xl">
        <h1 class="
          tw-text-3xl tw-pt-12
          md:tw-text-7xl lg:tw-pl-8
        ">
          {{ header.title }}
        </h1>
        <p class="
          tw-pl-8 tw-py-2
          md:tw-text-lg md:tw-mt-8
          md:tw-max-w-lg
        ">
          {{ header.body }}
        </p>
      </div>

      <div class="
        tw-relative tw-w-full tw-overflow-hidden tw-pl-8 -tw-mr-4
        md:tw-absolute md:-tw-z-10 md:tw-h-[75vh] md:tw-right-0 md:tw-top-0
      ">
        <div
          class="
            tw-h-[80vw] tw-w-full tw-float-right
            md:tw-h-full md:tw-max-w-[69%]
          "
        >
          <img
            class="
              tw-h-full tw-w-full
              tw-object-cover
            "
            :src="safeGetImage(header.image)"
            :alt="header.title"
          >
        </div>
        <div v-if="lineBg" class="line-bg"></div>
      </div>

      <I18nLink
        v-if="header.link"
        class="
          tw-py-20 tw-pr-10 tw-text-right
          md:tw-text-left md:tw-ml-16
        "
        :to="header.link?.url || header.link?.cached_url"
      >
        <span class="arrow-link">{{ header.cta }}</span>
      </I18nLink>
    </div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '@/components/SectionPrototype';

export default {
  components: {
    SectionPrototype,
  },
  props: {
    header: Object,

    theme: {
      type: String,
      defualt: 'light',
    },

    addTopLine: {
      type: Boolean,
      default: false,
    },

    lineBg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.line-bg {
  pointer-events: none;
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  right: -40%;
  bottom: 0;
  background-size: 100%;
  background-position: left bottom;
  background-image: url("data:image/svg+xml,%3Csvg width='1420' height='1681' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(-11 710 841)'%3E%3Cpath d='M-145.255 1530.392s16.998-201.252 233.496-190.882c216.499 10.37 403.605 178.568 555.613 166.378 152.008-12.19-11.623-271.287 178.313-369.588 189.936-98.302 353.99-139.321 273.233-355.41-80.758-216.089 212.753-608.741 470.658-628.502' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
