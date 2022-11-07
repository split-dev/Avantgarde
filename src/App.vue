<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader';

export default {
  name: 'App',

  components: {
    AppHeader
  },

  watch: {
    '$i18n.locale'(val, old) {
      if (!old || val === old) return;
      this.$router.go(this.$router.currentRoute);
    },
  },

  created() {
    this.$store.dispatch('fetchLayout', this.$i18n.locale);
  },
};
</script>

<style lang="scss">
  @import "assets/styles/variables";
  @import "assets/styles/app";
  @import "assets/styles/links";
  @import "assets/styles/typo";
  @import "assets/styles/utils";

  @import "assets/styles/app_window";
</style>
