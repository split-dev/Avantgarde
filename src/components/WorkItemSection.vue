<template>
  <SectionPrototype
    :verticalTitle="verticalTitle"
    :theme="theme"
    :id="id"
    :data-work-id="workId"
    :className="`work-item-section ${verticalTitle.toLowerCase()}-section bg-${theme}`"
    :container-class-name="`work-item-container ${verticalTitle.toLowerCase()}-container`"
    content-center
  >
    <v-col class="d-flex flex-column justify-start justify-sm-center align-start" cols="12" sm="6">
      <v-img :src="image" class="work-image" eager></v-img>
      <h2 class="title-h1">{{heading}}</h2>
      <p class="body-pre-text">{{description}}</p>
      <i18n-link
        :to="`${$i18n.locale}/work/${workId}`"
        class="arrow-link text-decoration-none"
      >
        {{ linkLabel }}
      </i18n-link>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";

export default {
  name: "WorkItemSection",
  props: {
    id: {
      type: String
    },
    workId: {
      type: String
    },
    verticalTitle: {
      type: String
    },
    heading: {
      type: String
    },
    image: {
      type: String
    },
    theme: {
      type: String
    },
    description: {
      type: String
    },
    linkLabel: {
      type: String
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({})
}
</script>
