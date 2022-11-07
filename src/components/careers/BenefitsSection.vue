<template>
  <SectionPrototype 
    :container="false"
    :vertical-title="benefits.verticalText"
    theme="dark"
    v-editable="benefits"
  >
    <div class="  
      tw-flex tw-flex-col tw-pl-8 tw-pb-40
      lg:tw-justify-around lg:tw-h-[calc(100vh-100px)] lg:tw-pl-32
    ">
      <div
        class="tw-w-auto tw-mt-14"
        v-for="(section, i) in benefits.sections"
        v-editable="section"
        :key="i"
        @click="select(i)"
      >
        <h3 class="
          tw-text-3xl tw-text-[#72FDDA] tw-mb-4
          lg:tw-text-[100px]
        ">
          {{ section.title }}
        </h3>
        <Transition name="slide-fade">
          <div 
            class="benefits tw-border-b-2 tw-border-[#72FDDA]"
            v-if="selected === i"
            v-html="renderRichText(section.items)"
          ></div>
        </Transition>
      </div>
    </div>
    <div class="line-bg"></div>
  </SectionPrototype>
</template>

<script>
import { renderRichText } from "@storyblok/vue-2";
import SectionPrototype from '@/components/SectionPrototype';

export default {
  components: {
    SectionPrototype,
  },
  props: {
    benefits: Object,
  },
  data: () => ({
    selected: null,
  }),
  methods: {
    renderRichText,
    select(i) {
      this.selected = this.selected === i ? null : i;
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .benefits {
  width: max-content;
  @apply lg:tw-mt-16;

  p {
    @apply tw-mb-0 tw-text-lg 
      lg:tw-text-4xl lg:tw-my-4;
    width: max-content;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
