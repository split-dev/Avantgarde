<template>
  <v-footer dark class="app-footer px-0">
    <div class="footer-content">
      <v-container fluid>
        <v-row no-gutters>
          <v-col class="footer-text">
            <h2 class="footer-header">
              {{ bigHeadline }}
            </h2>
            <p class="footer-description">
              {{ copy }}
            </p>
            <i18n-link
              v-if="ctaUrl"
              :to="ctaUrl?.url || ctaUrl?.cached_url"
              class="arrow-link text-decoration-none"
            >
              {{ ctaLabel }}
            </i18n-link>
          </v-col>
          <v-col cols="12" md="3">
            <div class="d-flex flex-column fill-height align-stretch align-content-start justify-space-around">
              <div
                v-editable="group"
                v-for="group in linkGroups"
                :key="group._uid"
                :class="`footer-links footer-links--${group.length}`"
              >
                <div
                  v-editable="link"
                  v-for="link in group.links"
                  :key="link._uid"
                >
                  <i18n-link :to="link.url?.url || link.url?.cached_url">
                    {{ link.label }}
                  </i18n-link>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="copyright">
      {{ copyright }}
    </div>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "FooterSection",

  computed: {
    ...mapState(['layout']),

    content() {
      return this.layout?.content;
    },

    copyright() {
      return this.content?.copyright;
    },

    linkGroups() {
      return this.content?.link_groups;
    },

    bigHeadline() {
      return this.content?.big_headline;
    },

    copy() {
      return this.content?.copy;
    },

    ctaLabel() {
      return this.content?.cta_label;
    },

    ctaUrl() {
      return this.content?.cta_url;
    }
  }
}
</script>

<style lang="scss">
@import "./src/assets/styles/sections/footer";
</style>
