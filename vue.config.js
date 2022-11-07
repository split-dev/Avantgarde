const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    allowedHosts: 'all',
    server: process.env.LOCAL_HTTPS // Storyblok bridge requires HTTPS
    ? {  // We need a TLS cert and key for the local server - Check README
      type: 'https',
      options: {
        key: './devserver/localhost-key.pem',
        cert: './devserver/localhost.pem',
      },
    }
    : {} // Reverse proxy takes care of TLS termination in non-local envs
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
});
