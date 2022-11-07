<template>
  <SectionPrototype
    :vertical-title="$vuetify.breakpoint.smAndDown ? null : ''"
    theme="light"
    :container="false"
    :class="{ 'above-line': $vuetify.breakpoint.smAndDown }"
    add-top-line
    v-editable="contacts"
  >
    <div class="tw-overflow-hidden tw-max-w-[calc(100vw-0px)] tw-p-8">
      <div v-if="$vuetify.breakpoint.smAndDown">
        <h3 class="tw-text-3xl tw-mb-8">Get in contact</h3>
        <CarouselBlock type="custom" ref="carousel">
          <div
            class="swiper-slide"
            v-for="(person, i) in contacts.contacts"
            v-editable="person"
            :key="i"
          >
            <div class="tw-max-w-full">
              <img
                class="tw-max-w-[387px] tw-w-full"
                :src="safeGetImage(person.picture)"
                :alt="person.name">

              <div class="tw-border-y tw-border-[#B5B5B5] tw-mt-8 info-card">
                <span
                  class="
                    tw-hidden tw-text-base tw-opacity-70 tw-py-2
                    md:tw-block
                  "
                >
                  {{ person.position }}
                </span>
                <h3 class="
                  tw-text-3xl tw-mb-0
                  md:tw-text-2xl
                ">
                  {{ person.name }}
                </h3>
                <p class="tw-text-lg lg:tw-max-w-xs">
                  {{ person.email }}
                </p>
                <p class="tw-text-lg lg:tw-max-w-xs">
                  phone: {{ person.phone }}
                </p>
              </div>
            </div>
          </div>
        </CarouselBlock>
      </div>

      <template v-else>
        <h3 class="
          tw-text-3xl tw-mb-8 tw-mt-16
          xl:tw-text-7xl
        ">
          {{ (contacts.title || '').replace(/\$\{name\}/g, selectedContact.name || '') }}
        </h3>
        <div class="
          tw-flex tw-flex-row tw-gap-8
          xl:tw-px-32 xl:tw-gap-32 xl:tw-mb-32
        ">
          <img
            class="
              tw-max-h-[387px] tw-w-full tw-flex-basis-[calc(50%-32px)]
              xl:tw-w-[674px] xl:tw-h-[745px] xl:tw-max-h-screen xl:tw-max-h-auto
            "
            :src="safeGetImage(selectedContact.picture)"
            :alt="selectedContact.name">

          <div class="
            tw-flex tw-flex-row tw-flex-wrap tw-gap-x-8 tw-gap-y-0
            xl:tw-gap-x-16 xl:tw-gap-y-0
          ">
            <div
              class="
                info-card tw-border-[#B5B5B5]
                tw-basis-[calc(50%-32px)] tw-py-8
              "
              :class="{
                'tw-border-y': i <= 1,
                'tw-border-b': i > 1,
              }"
              v-for="(person, i) in contacts.contacts"
              v-editable="person"
              :key="i" 
              @click="selected = person._uid"
            >
              <span
                class="
                  tw-hidden tw-text-base tw-opacity-70 tw-py-2
                  md:tw-block
                "
              >
                {{ person.position }}
              </span>
              <h3 class="
                tw-text-3xl tw-mb-0
                md:tw-text-2xl
              ">
                {{ person.name }}
              </h3>
              <p class="tw-text-lg lg:tw-max-w-xs">
                {{ person.email }}
              </p>
              <p class="tw-text-lg lg:tw-max-w-xs">
                phone: {{ person.phone }}
              </p>
            </div>
          </div>
        </div>
      </template>
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
    contacts: Object,
  },
  data: () => ({
    selected: null,
  }),
  mounted() {
    this.initSwiper();
  },
  computed: {
    selectedContact() {
      if (!this.contacts.contacts) return {};
      if (!this.selected) return this.contacts.contacts[0];
      return this.contacts.contacts.find(({ _uid }) => _uid === this.selected);
    },
  },
  methods: {
    initSwiper() {
      if (!this.$vuetify.breakpoint.mobile) return;
      if (!document.querySelectorAll('.swiper-slide').length) {
        return setTimeout(this.initSwiper, 100);
      }
      if (this.$refs.carousel) this.$refs.carousel.init();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .info-card p {
  margin-bottom: 0 !important;
}
::v-deep .paging-label {
  display: none !important;
}
</style>
