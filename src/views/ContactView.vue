<template>
  <div class="contacts-view">
    <OptionsHeader
      v-if="headerBlok"
      :blok="headerBlok"
      @option-selected="handleSelectOption"
    />

    <SectionPrototype
      id=""
      vertical-title=""
    >
      <div class="
        tw-flex tw-flex-col
        tw-pl-4 tw-w-[calc(100%-36px)]
        lg:tw-flex-row
      ">
        <div class="
          lg:tw-w-1/2
          xl:tw-pt-12 xl:tw-pb-24
        ">
          <h3 class="
            tw-text tw-text-4xl tw-py-12
            lg:tw-text-4xl lg:tw-max-w-[250px]
            xl:tw-text-7xl xl:tw-max-w-[450px] xl:tw-pb-12 xl:tw-pt-0
          ">
            Send us your message
          </h3>

          <div
            class="
              tw-flex tw-flex-col
              lg:tw-flex-row lg:tw-gap-4
              2xl:tw-gap-8
            "
            v-editable="contact"
          >
            <img
              class="
                lg:tw-w-[130px] lg:tw-h-[144px]
                xl:tw-w-[230px] xl:tw-h-[260px]
                2xl:tw-w-[260px] 2xl:tw-h-[290px]
              "
              :src="safeGetImage(contact.picture)"
              :alt="`${contact.name} - ${contact.position}`">
            <div class="
              tw-flex tw-flex-col
              xl:tw-justify-center
            ">
              <div class="
                tw-mt-12 tw-opacity-70
                lg:tw-mt-0 lg:tw-text-xs
                2xl:tw-text-base
              ">
                {{ contact.position }}
              </div>
              <div class="
                tw-mt-6 tw-text-xl
                lg:tw-my-4 lg:tw-text-base
                2xl:tw-text-2xl
              ">
                {{ contact.name }}
              </div>
              <a class="
                  tw-block tw-text-black tw-text-lg
                  lg:tw-text-xs
                  2xl:tw-text-lg
                "
                :href="`mailto:${contact.email}`"
              >
                {{ contact.email }}
              </a>
              <span
                class="
                  tw-block tw-text-lg
                  lg:tw-text-xs
                  2xl:tw-text-lg
                ">
                  phone: <a class="tw-text-black" :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
              </span>
            </div>
          </div>
        </div>
        <div class="
          xl:tw-flex-grow xl:tw-px-20 xl:tw-border-l
          xl:tw-max-w-xl xl:tw-flex xl:tw-flex-col xl:tw-justify-center
        ">
          <div class="
            tw-my-12 tw-text-sm tw-text-center tw-py-2
            tw-border tw-border-[#707070] tw-rounded-2xl
            lg:tw-text-xs lg:tw-max-w-[250px]
          ">
            {{ contact.formLabel }}
          </div>

          <v-form
            id="contactForm"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              label="Name"
              v-model="formData.name"
              :rules="[(v) => !!v || 'Please provide a name']"
              required
            />

            <v-text-field
              label="E-Mail"
              v-model="formData.email"
              :rules="[(v) => !!v || 'Please provide your email']"
              required
            />

            <v-text-field
              label="Message"
              v-model="formData.message"
              :rules="[(v) => !!v || 'Please provide a message']"
              required
            />
          </v-form>

          <button
            class="
              arrow-link tw-float-right tw-my-10
            "
            @click="handleSubmission"
          >
            Send Message
          </button>
        </div>
      </div>
    </SectionPrototype>
    <FooterSection 
      ref="footer" 
      v-intersect="{handler: onIntersectFooter, options: { threshold: [0.0] }}" 
      data-section="footer"
    />
    <div class="left-line"></div>
  </div>
</template>

<script>
import { useStoryblok } from "@storyblok/vue-2";
import { intersectionMixin } from "@/mixins/IntersectionMixin";

import OptionsHeader from '@/components/OptionsHeader.vue';
import FooterSection from '@/components/FooterSection.vue';
import SectionPrototype from '@/components/SectionPrototype.vue';

export default {
  mixins: [intersectionMixin],

  components: {
    OptionsHeader,
    FooterSection,
    SectionPrototype,
  },

  data: () => ({
    valid: false,
    story: null,
    selected: null,
    contact: {},
    formData: {},
  }),

  async created() {
    this.story = await useStoryblok('contact', { ...this.storyOptions });
  },

  computed: {
    headerBlok() {
      if (!this.story) return null;
      const { content: { title, subtitle, options } } = this.story;
      return {
        title,
        subtitle,
        options: options.map(option => ({
          label: option.label,
          value: option._uid,
          selected: this.selected === option._uid,
          _editable: option._editable,
        })),
      };
    },
  },

  watch: {
    story() {
      this.selected = this.story.content.options[0]._uid;
    },

    selected() {
      const { content: { options } } = this.story;
      const [option] = options.filter(({ _uid }) => _uid === this.selected);
      this.contact = {
        formLabel: option.formLabel,
        _editable: option.contact[0]._editable,
        ...option.contact[0],
      };
    },
  },

  methods: {
    handleSubmission() {
      console.log(this.$refs.form.validate());
      return null;
    },

    handleSelectOption(option) {
      this.selected = option;
      this.goToSection('contactForm', window.innerHeight);
    },
  },
};
</script>
