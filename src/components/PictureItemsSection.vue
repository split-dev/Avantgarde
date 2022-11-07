<template>
  <SectionPrototype
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.0, 0.2, 0.3, 0.8, 0.1] }}"
      :verticalTitle="verticalTitle" :theme="theme"
      :className="`picture-items-section ${verticalTitle.toLowerCase()}-section bg-${theme}`"
      :container-class-name="`picture-items-container ${verticalTitle.toLowerCase()}-container`" content-center>
    <v-col cols="12">
      <h2 class="title-h1">{{heading}}</h2>
      <div :class="`d-flex flex-wrap flex-lg-nowrap flex-row ${reverse ? 'flex-md-row-reverse' : ''}`">
        <v-img eager max-width="630px" height="100%" :src="image" class="col-12 col-lg-5"></v-img>
        <ul class="items-list col-12 col-lg-7">
          <li
            v-for="item in itemsList" :key="item.title"
            v-editable="item.editableBlock"
          >
            <h3 class="title-h3">{{item.title}}</h3>
          </li>
        </ul>
      </div>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";
import { intersectionMixin } from "@/mixins/IntersectionMixin";

export default {
  name: "LocationsSection",
  mixins: [intersectionMixin],
  props: {
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
    itemsList: {
      type: Array
    },
    reverse: {
      type: Boolean
    }
  },
  components: {
    SectionPrototype
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
.picture-items-section ::v-deep {
  padding-bottom: 340px;
  border-top: 1px solid $border-color;
  .picture-items-container {
    padding: 40px 54px;
  }
  & + .picture-items-section {
    &.bg-dark {
      box-shadow: 0px -148px 0 0 $dark-bg;
    }
    &.bg-light {
      box-shadow: 0px -148px 0 0 $light-text;
    }
  }

  .title-h1 {
    margin-bottom: 96px;
    @media (min-width: $media-md) {
      max-width: 50vw;
    }
  }

  .items-list {
    align-content: flex-start;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding-left: 124px;
    padding-right: 140px;
    li {
      margin-right: 15px;
      min-height: 134px;
      padding: 22px 0 30px 0;
      display: inline-block;
      width: calc(50% - 16px);
      box-shadow: 0 1px 0 0 $border-color;
      border-top: 1px solid $border-color;
      @media (max-width: 1300px) {
        width: 100%;
      }
      @media (max-width: $media-md) {
        padding: 19px 0 25px 0;
        min-height: 109px;
        margin: 0;
      }
    }
  }
  @media (min-width: $media-md) {
    .flex-md-row-reverse {
      .items-list {
        padding-left: 60px;
        padding-right: 118px;
      }
    }
  }
  @media (max-width: 1500px) {
    .items-list {
      padding-left: 60px;
      padding-right: 0;
    }
    .flex-md-row-reverse {
      .items-list {
        padding-left: 0;
        padding-right: 60px;
      }
    }
  }

  @media (max-width: $media-md) {
    padding-bottom: 112px;
    .picture-items-container {
      padding: 30px 36px 30px 30px;
      max-width: calc(100% - 30px);
    }
    .title-h1 {
      margin-bottom: 36px;
    }
    .v-image {
      max-width: 100% !important;
    }
    .items-list {
      padding-left: 0;
      padding-right: 0 !important;
      padding-top: 34px;
    }
    & + .picture-items-section {
      &.bg-dark {
        box-shadow: 0px -82px 0 0 $dark-bg;
      }
      &.bg-light {
        box-shadow: 0px -82px 0 0 $light-text;
      }
    }
  }
}

@import "../assets/styles/animations/service_section_slide";

</style>
