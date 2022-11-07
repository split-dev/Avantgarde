<template>
  <v-row class="services_teasers__row py-9 pt-md-2 pb-md-16">
    <v-col class="services_teasers__col" cols="12" md="6" lg="3"
           v-for="block in servicesImagesBlocks" :key="block._uid">
      <div @click="$emit('blockClick', block.link)">
        <div :class="`services_teasers__item services_teasers__item--${size || 'default'} position-relative z-stack`">
          <div class="services_teasers__item__inner d-flex h-100 absolute-fill">
            <v-img
                :min-height="imgHeight || '100%'"
                class="absolute-fill z-behind"
                :src="(block.image || {}).filename || block.img_src"
                :alt="block.title"
            />
            <h2 class="services_teasers__item__heading text-light" v-html="block.title"></h2>
            <div class="services_teasers__item__content" v-html="block.description" />
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ServicesTeasersBlock",
  props: {
    servicesImagesBlocks: {
      type: Array
    },
    imgHeight: {
      type: [Number, String]
    },
    size: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/variables";
@import "./src/assets/styles/blocks/services_teasers";
</style>
