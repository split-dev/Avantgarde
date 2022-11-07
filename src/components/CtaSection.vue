<template>
  <section class="cta d-flex justify-center align-center position-relative z-stack">
    <v-img
      :src="this.$vuetify.breakpoint.mobile ? imageMobile : image"
      :lazy-src="this.$vuetify.breakpoint.mobile ? imageMobile : image"
      class="absolute-fill z-behind"></v-img>
    <span class="cta__overlay absolute-fill z-stack"></span>

    <svg class="cta__decoration d-none d-md-block position-absolute z-stack-2" viewBox="0 0 972 384"><path fill="none" stroke="#98fcce" stroke-miterlimit="20" d="M10 73.927S172.41992-26.54151 324.63477 24.71362C476.84961 75.96875 499.49415 170.39575 548 230.948c48.50586 60.55225 126.86523 120.43213 211.50977 92.94263 84.64453-27.4895 155.51172 5.9585 202.49023 50.073"/></svg>
    <svg class="cta__decoration d-md-none position-absolute z-stack-2" viewBox="0 0 391.242 149.038"><g transform="translate(-35.01 -1998.909)"><path fill="none" stroke="#72fdda" stroke-width="2" d="M.30684361 2097.3695519s27.42458264-28.1667308 96.5658939-12.83325814 111.56337855 51.73066813 162.22857418 59.66654817 25.75809397-40.17449768 98.10770987-42.3320156 130.06493297 2.35770082 127.37384733-34.21268763 135.31684075-74.88993905 221.17388436-61.29345361"/></g></svg>
    
    <div class="cta__inner text-md-center z-stack-3">
      <h2 class="cta__heading title-h2 text-white">{{title}}</h2>
      <div class="cta__description">
        <p class="body-text text-white">
          {{description}}
        </p>
      </div>
      <div>
        <i18n-link class="arrow-link py-5 text-decoration-none text-light" :to="url" v-if="label">{{label}}</i18n-link>
      </div>
    </div>
  </section>
</template>
  
  <script>
  export default {
    name: "CtaSection",
    props: {
      title: {
        type: String
      },
      description: {
        type: String
      },
      image: {
        type: String
      },
      imageMobile: {
        type: String
      },
      url: {
        type: String
      },
      label: {
        type: String
      }
    },
    data: () => ({})
  }
  </script>
  
  <style lang="scss">
  @import "./src/assets/styles/variables";
  @import "./src/assets/styles/blocks/cta";
  </style>
