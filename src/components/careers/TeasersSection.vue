<template>
  <SectionPrototype
    :vertical-title="jobTeasers.verticalText"
    theme="light"
    add-top-line
    :container="false"
    v-editable="jobTeasers"
  >
    <h1 class="
      tw-text-3xl tw-py-12 tw-pl-8
      md:tw-text-7xl md:tw-max-w-lg
    ">
      {{ jobTeasers.title }}
    </h1>

    <div class="
      tw-flex tw-flex-col tw-w-full
      md:tw-h-max
      xl:tw-flex-row md:tw-gap-8
    ">
      <div
        class="
          tw-h-[336px] tw-float-right
          md:tw-h-auto
          md:tw-basis-2/5 md:tw-shrink-0
          xl:tw-basis-1/3
          2xl:tw-w-[634px] 2xl:tw-h-[778px]
        "
      >
        <img
          class="
            tw-h-full tw-w-full
            tw-object-cover
            tw-object-top
          "
          :src="safeGetImage(jobTeasers.image)"
          :alt="jobTeasers.title"
        >
      </div>
      <div class="
        tw-flex tw-flex-col
        md:tw-flex-row md:tw-flex-wrap md:tw-justify-evenly
        lg:tw-gap-x-8 lg:tw-flex-grow lg:tw-content-baseline
        lg:tw-items-baseline
        xl:tw-pl-[2vw]
        2xl:tw-pl-28
      ">
        <div
          class="
            tw-py-12 tw-border-t tw-border-[#B5B5B5]
            md:tw-py-4 md:tw-basis-[calc(50%-32px)] md:tw-border-0
            lg:tw-flex lg:tw-items-center lg:py-12 lg:tw-basis-[calc(50%-128px)]
            xl:tw-basis-[calc(50%-32px)]
          "
          v-for="(job, i) in jobTeasers.jobs"
          v-editable="job"
          :key="i"
          :class="{
            'tw-border-b': jobTeasers.jobs.length === i + 1,
            'md:tw-border-y': i <= 1,
            'md:tw-border-b': i > 1,
          }"
        >
          <div class="
            tw-w-[250px] tw-pl-8
            md:tw-pl-0
            lg:tw-w-auto lg:tw-py-4
          ">
            <span
              class="
                tw-hidden tw-text-base tw-opacity-70 tw-py-2
                md:tw-block
              "
            >
              {{ job.location }}
            </span>
            <h3 class="
              tw-text-3xl tw-mb-4
              md:tw-text-2xl
            ">
              {{ job.position }}
            </h3>
            <p class="tw-text-lg tw-mb-4 lg:tw-max-w-xs">
              {{ job.description }}
            </p>

            <I18nLink v-if="job.link?.cached_url" :to="job.link?.cached_url">
              <span class="tw-text-black tw-underline tw-text-lg">{{ $t('apply_now') }}</span>
            </I18nLink>
          </div>
        </div>
      </div>
    </div>

    <I18nLink
      v-if="jobTeasers.link?.cached_url"
      class="tw-py-20 tw-pr-10 tw-text-right md:tw-w-full"
      :to="jobTeasers.link?.cached_url"
    >
      <span class="arrow-link tw-text-3xl tw-pl-8">{{ jobTeasers.cta }}</span>
    </I18nLink>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '@/components/SectionPrototype';

export default {
  components: {
    SectionPrototype,
  },
  props: {
    jobTeasers: Object,
  }
};
</script>