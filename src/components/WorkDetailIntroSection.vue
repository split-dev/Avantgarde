<template>
  <SectionPrototype :verticalTitle="verticalTitle" :theme="theme" className="work-detail-intro-section" containerClassName="work-detail-intro-section-container">
    <div class="work-detail-intro-content">
      <i18n-link class="arrow-link arrow-link--back text-decoration-none" to="/work">
        {{ $t('back_to_all_works' )}}
      </i18n-link>
      <h1 class="title-h1 text-cyan">{{$vuetify.breakpoint.mobile ? mobileTitle : title}}</h1>
      <p class="body-pre-text">{{description}}</p>
    </div>
    <v-img :src="image" cover eager width="100%" max-width="100%"></v-img>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from '../components/SectionPrototype';

export default {
  name: "WorkDetailIntroSection",
  props: {
    theme: {
      type: String
    },
    title: {
      type: String
    },
    mobileTitle: {
      type: String
    },
    verticalTitle: {
      type: String
    },
    description: {
      type: String
    },
    image: {
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
  @import "./src/assets/styles/variables";
  @import "./src/assets/styles/blocks/work_detail_intro_block";
</style>
