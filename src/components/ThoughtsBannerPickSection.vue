<template>
  <SectionPrototype class-name="thoughts-banner" container-class-name="thoughts-banner-container" above-line :theme="theme">
    <v-col class="d-flex flex-column justify-center align-start pr-10" cols="12" lg="6">
      <h2 class="title-great text-cyan">{{title}}</h2>
      <h3 class="title-h3">{{subtitle}}</h3>
      <p class="body-text">{{description}}</p>
    </v-col>
    <v-col cols="12" lg="6">
      <v-img eager :src="image"></v-img>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";

export default {
  name: "ThoughtsBannerPickSection",
  props: {
    theme: {
      type: String
    },
    image: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    description: {
      type: String
    }
  },
  components: {
    SectionPrototype
  },
  methods: {
  },
  data: () => ({
  })
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.thoughts-banner {
  background-color: $dark-bg;
  ::v-deep &-container {
    padding: 88px 0 88px 160px;
    @media (max-width: $media-sm) {
      padding: 60px 36px 90px 36px;
    }
  }
  .title-great {
    margin-bottom: 80px;
    @media (max-width: $media-sm) {
      margin-bottom: 30px;
    }
  }
  .title-h3, p {
    max-width: 460px;
    margin-bottom: 18px;
  }
  @media (max-width: $media-sm) {
    .v-image {
      max-height: 222px;
    }
    .title-h3 {
      font-size: 35px;
      margin-bottom: 13px;
    }
    p {
      margin-bottom: 50px;
    }
  }
}
</style>
