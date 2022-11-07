<template>
  <SectionPrototype :theme="theme" contentCenter className="thought-header" containerClassName="thought-header-container">
    <div class="d-flex flex-column flex-md-row justify-space-between flex-fill">
      <div class="thought-heading">
        <h1 class="title-h1">{{title}}</h1>
        <div class="thought-date body-text">{{date}}</div>
      </div>
      <div class="thought-share align-self-start align-self-md-end">
        <span class="body-text">Share</span>
        <div class="social-icons d-flex flex-nowrap">
          <!-- TODO share links -->
          <a href="#" class="social-icon"><v-icon dark class="light--text">$vuetify.icons.insta</v-icon></a>
          <a href="#" class="social-icon"><v-icon dark class="light--text">$vuetify.icons.lnkdn</v-icon></a>
          <a href="#" class="social-icon"><v-icon dark class="light--text">$vuetify.icons.fb</v-icon></a>
        </div>
      </div>
    </div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';

export default {
  name: "ThoughtHeaderSection",
  props: {
    theme: {
      type: String
    },
    title: {
      type: String
    },
    date: {
      type: String
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({})
}
</script>

<style lang="scss">
  @import "../assets/styles/variables";
  @import "../assets/styles/blocks/social_icons";

  .thought-header {
    padding: 160px 140px 74px 140px;
    border-bottom: 1px solid $border-color;
    .thought-date {
      margin-top: 25px;
    }
    .thought-share {
      @media (max-width: $media-sm) {
        padding-top: 37px;
      }
    }
    .social-icons {
      margin-top: 8px;
      .social-icon {
        width: 46px;
        height: 46px;
        margin-right: 20px;
        .v-icon__component {
          width: 46px;
          height: 46px;
        }
      }
    }
    @media (max-width: $media-sm) {
      padding: 30px 36px 44px 36px;
      .thought-heading .title-h1 {
        font-size: 50px;
        line-height: 55px;
      }
    }
  }
</style>
