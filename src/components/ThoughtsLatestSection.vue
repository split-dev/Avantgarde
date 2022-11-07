<template>
  <SectionPrototype vertical-title="" container-class-name="thoughts-latest-container" class-name="thoughts-latest" content-center :theme="theme">
    <v-col class="d-flex flex-column justify-center align-start" cols="12" lg="6">
      <h2 class="title-great">{{title}}</h2>
    </v-col>
    <v-col cols="12" lg="6">
      <ul class="latest-list">
        <li v-for="item in items" :key="item.key">
          <v-img eager :src="item.image" width="123px" height="137px" max-height="137px"></v-img>
          <div>
            <span class="title-h3">{{item.title}}</span>
            <p class="body-text text-black">{{item.content}}</p>
          </div>
        </li>
      </ul>
    </v-col>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";

export default {
  name: "ThoughtsLatestSection",
  props: {
    theme: {
      type: String
    },
    title: {
      type: String
    },
    items: {
      type: Array
    }
  },
  components: {
    SectionPrototype
  },
  methods: {
  },
  data: () => ({
  })
}
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";

.thoughts-latest {
  ::v-deep &-container {
    padding: 0 200px 0 40px;
    @media (max-width: 1440px) {
      padding-right: 100px;
    }
    @media (max-width: $media-md) {
      padding: 40px 36px 0 36px;
    }
  }
  .title-great {
    line-height: 155px;
    @media (max-width: $media-md) {
      line-height: 1.2;
    }
  }
  .latest-list {
    list-style: none;
    margin: 0 0;
    padding-left: 154px;
    padding-top: 155px;
    padding-bottom: 155px;
    border-left: 1px solid $border-color;
    li {
      display: flex;
      flex-direction: row;
      margin-bottom: 25px;
      .v-image {
        margin-right: 12px;
        @media (max-width: $media-sm) {
          margin-right: 10px;
          width: 72px !important;
          height: 81px !important;
          max-width: 72px;
          max-height: 81px;
        }
      }
      .title-h3 {
        display: block;
        margin-bottom: 18px;
        @media (max-width: $media-sm) {
          line-height: 31px;
          margin-bottom: 12px;
        }
      }
      p {
        margin-bottom: 0;
      }
      @media (max-width: $media-sm) {
        margin-bottom: 50px;
      }
    }
    @media (max-width: 1352px) {
      border-left: 0;
      padding: 55px 0 64px 0;
      @media (max-width: $media-sm) {
        padding-bottom: 14px;
      }
    }
  }
  @media (max-width: $media-sm) {
    z-index: 3;
    ::v-deep .vertical-text {
      display: none;
    }
  }
}
</style>
