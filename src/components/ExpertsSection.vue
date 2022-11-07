<template>
    <SectionPrototype verticalTitle="" theme="dark" contentCenter className="experts bg-dark" containerClassName="experts__container">
      <v-col cols="12">
        <h2 class="mb-6 title-great">650 Experts</h2>
        <div class="experts__text d-flex flex-column align-start body-text">
          <p>Get to know three of our employees and feel more into the avantgarde.</p>
        </div>
        <div class="experts__images d-flex mt-11">
          <div v-for="image in images" 
            :key="image" 
            class="experts__images__single-image"
          >
            <v-img :src="image" />
          </div>
        </div>

        <h2 class="mb-6 title-great text-cyan">10 Locations</h2>

        <div class="experts__text d-flex flex-column align-start body-text">
          <p>Munich HQ | Berlin | Cologne | Dresden | Dubai | London | Amsterdam | Shanghai | Stuttgart | Vienna | Zurich </p>
        </div>

        <h2 class="mt-14 mb-6 title-great text-cyan">7 Countries</h2>
        <div class="experts__text d-flex flex-column align-start body-text">
          <p>Germany | Saudi Arabia | Großbritannien | The Netherlands | China | Austria | Switzerland</p>          
        </div>

        <div class="d-none d-md-block mt-13 text-right">
            <i18n-link to="#" class="arrow-link text-decoration-none py-5">Learn more</i18n-link>
        </div>
      </v-col>

      <svg class="experts__decor d-none d-md-block position-absolute z-behind events-none" xmlns="http://www.w3.org/2000/svg" width="2035" height="1205" viewBox="0 0 2035 1205"><g><g transform="rotate(1 1018 603)"><path fill="none" stroke="#72fdda" stroke-miterlimit="20" stroke-width="2" d="M12.137 1222.457v0s19.983-180.952 274.468-171.627c254.487 9.324 474.426 160.555 653.106 149.596 178.681-10.96-13.663-243.922 209.601-332.306 223.265-88.387 416.106-125.267 321.176-319.558-94.927-194.29 250.087-547.333 553.247-565.102"/></g></g></svg>
    </SectionPrototype>
  </template>
  
  <script>
  import SectionPrototype from '../components/SectionPrototype';
  
  export default {
    name: "ExpertsSection",
    props: {
    },
    components: {
      SectionPrototype
    },
    data: () => ({
      images: [
        'https://a.storyblok.com/f/177709/298x358/99f15b8a69/expert-1.jpg',
        'https://a.storyblok.com/f/177709/333x439/c36b9aa559/expert-2.jpg',
        'https://a.storyblok.com/f/177709/332x416/e66027127a/expert-3.jpg'
      ]
    })
  }
  </script>
  
  <style lang="scss">
    @import "../assets/styles/variables";
    @import "../assets/styles/blocks/experts";
  </style>
  