<template>
  <SectionPrototype    
    :verticalTitle="sidebar_title"
    theme="dark">
    <ul class="tw-pt-20 sm:tw-ml-20 sm:tw-mb-20 " >
      <li v-for="fact,index in facts" :key="index"><h2 class="mb-5 title-h1 facts">{{ fact.Fact }}</h2></li>
    </ul>
  </SectionPrototype>
</template>

<script>

import SectionPrototype from "@/components/SectionPrototype";

export default {
  name: "DiversityFactsSection",
  props: {
    sidebar_title: {
      type: String
    },
    facts: {
      type: Array
    }
  },
  components: {
    SectionPrototype,
  },
}
</script>

<style lang="scss">
@import "../assets/styles/variables";

.facts {
  color: $cyan-color;
  font-size: 100px;
  line-height: 175px;
  @media (max-width: $media-sm) {
    font-size: 35px;
    line-height: 45px;
  }
}


</style>