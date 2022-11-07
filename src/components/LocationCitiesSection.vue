<template>
  <SectionPrototype
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.3, 0.8, 0.1] }}"
      :verticalTitle="verticalTitle" :theme="theme"
      :className="`location-cities-section ${verticalTitle.toLowerCase()}-section bg-${theme}`"
      :container-class-name="`location-cities-container ${verticalTitle.toLowerCase()}-container`" content-center
    >
    <v-col cols="12" class="md:tw-mb-[127px]">

      <h2 class="title-h1
        tw-px-[26px]
        tw-mt-[52px] tw-mb-[50px]
        md:tw-px-0
        md:tw-mt-[127px] md:tw-mb-[92px]
      ">
        {{ title }}
      </h2>

      <div
        v-if="selectedCity"
        class="
          tw-grid tw-grid-cols-none tw-auto-rows-max
          md:tw-grid-cols-3 md:tw-grid-rows-[40px,auto]
          md:tw-gap-x-[42px]
      ">
        <div class="
          md:tw-col-start-1 md:tw-row-start-1 md:tw-row-span-2
        ">
          <img
            class="tw-max-w-full"
            :src="selectedCity.picture?.filename"
          />
        </div>

        <div class="
          cities-selector
          tw-relative
          tw-mx-[26px]
          -tw-order-1
          tw-text-[25px]
          md:tw-mx-0
          md:tw-order-0 md:tw-col-start-2
        ">
          <v-select
            name="cities"
            id="cities-selector"
            class="tw-w-9/12 tw-mt-0 lg:tw-w-full"
            v-model="selected"
            :dark="theme === 'dark'"
            :items="cities.map((city) => ({ text: city.name, value: city._uid }))"
          />
        </div>

        <div class="
          tw-px-[26px]
          md:tw-px-0
          md:tw-col-start-2 md:tw-row-start-2
        ">

          <div class="
            title-h1 tw-mt-[25px] tw-mb-[25px]
          ">
            {{ selectedCity.name }}
          </div>
          <div
            class="tw-max-w-[70vw] md:tw-max-w-[348px]"
            v-html="renderRichText(selectedCity.description)"
          />
        </div>

        <div class="
          md:tw-col-start-3 md:tw-row-start-1 md:tw-row-span-2
        ">

          <v-img
            class="
              tw-mr-[26px] tw-mt-[12px]
              md:tw-m-0
            "
            eager
            :src="contact.picture?.filename"
          />

          <div
            v-editable="contact"
            class="
              tw-px-[26px]
              tw-border-[#707070]
              tw-border-b
              tw-py-[24px]
              md:tw-px-0
              md:tw-mt-[28px]
              md:tw-min-h-[258px]
              md:tw-border-[#707070]
              md:tw-border-y
          ">
            <div class="
              tw-mb-[24px]
              tw-max-w-[70vw]
              md:tw-text-[15px] md:tw-opacity-70            
            ">
              {{ contact.position }}
            </div>
            <div class="
              tw-text-[25px]
              tw-mt-[24px] tw-mb-[20px]
            ">
              {{ contact.name }}
            </div>
            <div v-if="contact.email">
              {{ $t('mail') }}:
              {{ contact.email }}
            </div>
            <div v-if="contact.phone">
              {{ $t('phone') }}:
              {{ contact.phone }}
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";

import { renderRichText } from "@storyblok/vue-2";
import { intersectionMixin } from "@/mixins/IntersectionMixin";

export default {
  name: "LocationCitiesSection",

  mixins: [intersectionMixin],

  components: {
    SectionPrototype,
  },

  props: {
    verticalTitle: {
      type: String
    },
    title: {
      type: String
    },
    cities: {
      type: Array
    },
    contact: {
      type: Object
    },
    theme: {
      type: String
    }
  },

  data: () => ({
    selected: null,
  }),

  mounted() {
    this.selected = this.cities?.[0]._uid;
  },

  computed: {
    selectedCity() {
      if (!this.selected) return {};
      return this.cities.find(({ _uid }) => _uid === this.selected);
    },
  },

  methods: {
    renderRichText,
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

::v-deep .container {
  padding: 40px 54px;

  @media (max-width: $media-sm) {
    padding: 0;
  }
}

.cities-selector {
  select {
    height: 100%;
    width: 100%;
    padding: 0;
    border-radius: 0;
    outline: 0;
    border-bottom: 1px solid;
  }
}
</style>
