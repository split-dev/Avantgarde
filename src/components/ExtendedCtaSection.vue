<template>
    <section class="page-section cta cta--spaced d-flex flex-column justify-center align-center position-relative z-stack-2">
      <v-img
        eager
        :src="this.$vuetify.breakpoint.mobile ? imageMobile : image"
        :lazy-src="this.$vuetify.breakpoint.mobile ? imageMobile : image"
        width="100%"
        :height="this.$vuetify.breakpoint.mobile ? '50%' : ''"
        gradient="180deg, rgba(20, 19, 19, 0) 20%,  rgba(20, 19, 19, 1) 100%"
        class="cta__image position-absolute z-behind"></v-img>

      <div class="cta__inner cta__inner--no-limit position-relative text-center z-stack-3">
        <h2 class="cta__heading cta__heading--spaced title-h1 text-light">{{title}}</h2>
        <div class="cta__description">
          <p class="body-text text-light">
            {{description}}
          </p>
        </div>

      <div class="cta__description-extra">
        <div class="tw-flex tw-items-center tw-flex-wrap tw-gap-[40px] tw-space-around">
          <div
            v-for="(extra, idx) in descriptionExtras"
            :key="idx"
            class="tw-flex-1"
          >
            <i18n-link
              v-if="extra.link"
              :to="extra.link"
            >
              <v-img
                class="tw-max-w-[200px] md:tw-max-w-[min(18vw,300px)] tw-mx-auto transparent"
                :src="extra.image"
              />
            </i18n-link>
            <v-img
              v-else
              class="tw-max-w-[200px] md:tw-max-w-[min(18vw,300px)] tw-mx-auto transparent"
              :src="extra.image"
            />
          </div>
        </div>
        <div>
          <span class="text-light font-heading" v-html="descriptionExtra"></span>
        </div>
      </div>
    </div>

      <div class="cta__blocks position-relative title-h3 text-light z-stack-3">
        <v-row>
          <v-col cols="12" md="6" lg="3" v-for="block in blocks" :key="block.id">
            <div class="cta__blocks__single-block">
              <span v-html="block"></span>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
  </template>

    <script>
    export default {
      name: "ExtendedCtaSection",
      props: {
        title: {
          type: String
        },
        description: {
          type: String
        },
        image: {
          type: String
        },
        imageMobile: {
          type: String
        },
        descriptionExtras: {
          type: Array
        },
        descriptionExtra: {
          type: String
        },
        blocks: {
          type: Array
        }
      },
      data: () => ({})
    }
    </script>
