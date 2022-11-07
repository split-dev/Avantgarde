<template>
  <v-card color="black" class="menu-image-card">
    <i18n-link :to="article?.full_slug" class="menu-image-card-link text-decoration-none">
      <v-card-title class="justify-center justify-md-start">
        {{ title }}
      </v-card-title>
      <div class="menu-image-card-img-wrapper">
        <img
          class="mx-auto ml-md-0 tw-w-full tw-h-full tw-object-cover"
          :src="`${article?.content?.list_view_image?.filename}/m/800x800`"
        />
      </div>

      <v-card-subtitle class="text-decoration-none">
        {{ article?.content?.list_view_title }}
      </v-card-subtitle>
      <v-card-text class="text-decoration-none">
        {{ article?.content?.list_view_intro }}
      </v-card-text>
    </i18n-link>
  </v-card>
</template>

<script>
export default {
  name: "MenuImageBlock",

  props: {
    title: {
      type: String,
    },
    article: {
      type: Object,
    },
  }
}
</script>

<style scoped lang="scss">
  @import "./src/assets/styles/blocks/menu_image";
</style>
