<template>
  <SectionPrototype
    ref="locations"
    class="locations-section locations-container"
    :above-line="$vuetify.breakpoint.mobile ? false : true"
    :verticalTitle="sidebar_title"
  >
    <div class="d-flex flex-wrap flex-fill w-100 flex-lg-nowrap">
      <v-img
        eager
        :max-width="$vuetify.breakpoint.mobile ? '100%' : '50vw'"
        :width="$vuetify.breakpoint.mobile ? '100%' : '50vw'"
        :height="$vuetify.breakpoint.mobile ? 'auto' : '100%'"
        :src="image"
      />
      <ul class="locations-list">
        <li
          v-for="(location, i) in locationsList"
          :key="i"
          v-editable="location"
        >
          <i18n-link :to="location.URL.cached_url" class="text-decoration-none dark--text">
            <h3 class="title-h2">
              {{ location.Heading }}
            </h3>
            <p>{{location.Content}}</p>
            <ArrowTransparentIcon/>
          </i18n-link>
        </li>
        <div class="overlay"></div>
      </ul>
    </div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import ArrowTransparentIcon from "@/components/icons/ArrowTransparentIcon";

export default {
  name: "LocationsSection",
  props: {
    sidebar_title: {
      type: String
    },
    locationsList: {
      type: Array
    },
    image : {
      type: String
    }
  },
  components: {
    SectionPrototype,
    ArrowTransparentIcon
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.locations-section {
  ::v-deep .vertical-text {
    color: $light-text;
    @media (max-width: 1264px) {
      color: $dark-text;
    }
  }
  ::v-deep .title-h2 {
    margin-bottom: 8px;
  }
  @media (max-width: 1264px) {
    background: $light-text;
  }
  @media (max-width: $media-sm) {
    border-top: 1px solid $border-color;
  }
}
::v-deep .locations-container {
  padding: 0;
  overflow: visible;
  .v-image {
    margin-left: -160px;
    @media (max-width: 1264px) {
      width: 100%;
      max-width: 100% !important;
      height: auto !important;
      margin-left: 0;
    }
    @media (max-width: $media-sm) {
      width: calc(100vw - 60px) !important;
      max-width: 100% !important;
    }
  }
  @media (max-width: 1264px) {
    overflow: hidden;
    border-left: 1px solid $border-color;
  }
}

@import "./src/assets/styles/blocks/locations_list";
@import "./src/assets/styles/animations/locations_slide";
</style>
