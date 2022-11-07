<template>
  <div class="vertical-text">
    <h2 class="font-weight-light">{{text}}</h2>
  </div>
</template>

<script>
export default {
  name: "VerticalTextBlock",
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
@import "./src/assets/styles/blocks/vertical_text";
</style>
