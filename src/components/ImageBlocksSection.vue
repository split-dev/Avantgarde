<template>
  <SectionPrototype
    className="image-blocks"
    :theme="theme"
    contentCenter
    container-class-name="tw-pb-0"
    :verticalTitle="sidebarTitle"
  >
    <v-col>
      <ServicesTeasersBlock :servicesImagesBlocks="blocks" imgHeight="min(737px, 70vh)" size="big" @blockClick="openService"/>
      <div
        class="image-blocks__top d-none d-md-block mt-n3 py-10 pr-16 text-right position-relative"
      >
        <i18n-link
          to="/services"
          class="arrow-link text-light text-decoration-none"
        >
          {{ label }}
        </i18n-link>
      </div>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";

export default {
  name: "ImageBlocksSection",
  props: {
    theme: {
      type: String,
    },
    sidebarTitle: {
      type: String,
    },
    label: {
      type: String,
    },
    blocks: {
      type: Array,
    },
  },
  components: {
    SectionPrototype,
  },
  data: () => ({}),
  methods: {
    openService(link) {
      this.$router.push(`${this.$i18n.locale}/services/${link}`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/variables";

.image-blocks {
  &__top {
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      border-bottom: 1px solid $border-color;
      width: 100vw;
      right: 0;
    }
  }
  .vertical-text {
    padding-top: 48px;
    @media (min-width: $media-sm) {
      padding-top: 185px;
    }
  }
  .services_teasers__row {
    padding-left: 32px;
  }
  &.theme--dark {
    background-color: $dark-bg;
  }
}
@import "./src/assets/styles/animations/services_slide";
</style>
