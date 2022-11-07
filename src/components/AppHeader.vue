<template>
  <div id="app-header">
    <v-app-bar app flat hide-on-scroll :min-height="$vuetify.breakpoint.mobile ? 92 : 117" :height="$vuetify.breakpoint.mobile ? 92 : 117">
      <v-toolbar-title>
        <i18n-link to="/" class="text-decoration-none">
          <v-icon class="logo-icon black--text">$vuetify.icons.logo</v-icon>
        </i18n-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="drawer = true" class="menu-icon dark--text py-2 px-2">
        $vuetify.icons.hamburger
      </v-icon>
    </v-app-bar>
    <v-navigation-drawer
        app
        v-model="drawer"
        absolute
        class="black"
        dark
        width="100vw"
        right
        temporary
    >
      <div class="d-flex flex-row menu-header justify-space-between">
        <i18n-link to="/" class="text-decoration-none">
          <v-icon class="logo-icon light--text">$vuetify.icons.logo</v-icon>
        </i18n-link>
        <v-icon class="light--text py-2 px-2" @click="drawer = false">
          $vuetify.icons.hamburger
        </v-icon>
      </div>
      <div class="d-flex flex-column flex-md-row menu-content">
        <div class="d-flex flex-column flex-nowrap align-start align-content-start flex-grow-0 flex-md-grow-1">
          <v-list nav class="flex-grow-0 flex-md-grow-1">
            <v-list-item-group class="fill-height" v-model="group">
              <v-list-item
                v-for="link in navigationLinks"
                :key="link._uid"
              >
                <i18n-link :to="link.url?.url || link.url?.cached_url" class="text-decoration-none">
                  <v-list-item-title>{{ link.label }}</v-list-item-title>
                </i18n-link>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <div class="menu-socials">
            <div class="socials-icons d-flex flex-row flex-wrap align-center">
              <LanguageSwitcher />
              <div class="ml-4 ml-md-auto d-flex flex-nowrap">
                <a v-if="instagramLink" :href="instagramLink" class="social-icon"><v-icon class="light--text black-md--text">$vuetify.icons.insta</v-icon></a>
                <a v-if="linkedinLink" :href="linkedinLink" class="social-icon"><v-icon class="light--text black-md--text">$vuetify.icons.lnkdn</v-icon></a>
                <a v-if="facebookLink" :href="facebookLink" class="social-icon"><v-icon class="light--text black-md--text">$vuetify.icons.fb</v-icon></a>
              </div>
            </div>
          </div>
        </div>

        <MenuImageBlock
          v-if="article"
          :title="articleHeadline"
          :article="article"
        />
      </div>

    </v-navigation-drawer>
  </div>
</template>

<script>
import MenuImageBlock from '@/components/bloks/MenuImageBlock';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { mapState } from 'vuex';

export default {
  name: 'AppHeader',

  components: {
    LanguageSwitcher,
    MenuImageBlock,
  },

  data: () => ({
    drawer: false,
    group: null,
  }),

  computed: {
    ...mapState(['layout']),

    navigationLinks() {
      return this.layout?.content?.navigation_links;
    },
    articleHeadline() {
      return this.layout?.content?.article_headline;
    },
    article() {
      return this.layout?.content?.article_loader;
    },
    instagramLink() {
      return this.layout?.content?.instagram_link;
    },
    linkedinLink() {
      return this.layout?.content?.linkedin_link;
    },
    facebookLink() {
      return this.layout?.content?.facebook_link;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "./src/assets/styles/sections/header";
</style>

