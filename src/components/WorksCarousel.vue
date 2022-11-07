<template>
  <div class="works-carousel">
    <WorkItemSection
      v-for="work in works"
      v-intersect="{handler: onIntersectSection, options: { threshold: [0.2, 0.5, 1.0] }}"
      :data-section="work.title"
      :theme="work.theme || 'dark'"
      :key="work.id"
      :id="removeSpaces(work.title, '-')"
      :workId="work.id"
      :vertical-title="work.verticalTitle"
      :image="work.image"
      :heading="work.heading"
      :description="work.description"
      :link-label="work.linkLabel"
    />
  </div>
</template>

<script>
import { intersectionMixin } from "@/mixins/IntersectionMixin";
import WorkItemSection from "@/components/WorkItemSection";

export default {
  name: "WorksCarousel",
  components: {
    WorkItemSection
  },
  mixins: [intersectionMixin],
  props: {
    works: {
      type: Array
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";
@import "../assets/styles/animations/works_carousel_slide";

.works-carousel ::v-deep {
  &:after,
  &::after {
    display: block;
    content: '';
    width: 100%;
    position: sticky;
    height: 1px;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 30px;
    background-color: $border-color;
  }
  .vertical-text {
    display: flex;
    padding-bottom: 160px;
    top: auto;
  }
  .work-item-section {
    height: 100vh;
    .arrow-link {
      margin-top: 0;
      margin-bottom: auto;
      margin-left: 0;
    }
    .title-h1 {
      margin: auto 0 12px 0;
    }
    p {
      max-width: 450px;
      margin-bottom: 56px;
    }
  }
  .work-item-container {
    padding-left: 56px;
    position: relative;
    overflow: visible;
  }
  .title-h1, .arrow-link {
    position: relative;
    z-index: 2;
   }
  .v-image {
    position: absolute;
    width: 65vw;
    height: 85%;
    top: 10%;
    right: 0;
    z-index: 0;
    background-color: transparent;
  }

  @media (max-width: $media-xs) {
    .vertical-text {
      padding-bottom: 0;
    }
    .work-item-container {
      padding-bottom: 80px;
    }
    .work-item-section {
      height: auto;
      padding-top: 542px;
      .title-h1 {
        margin-top: 0;
        margin-bottom: 18px;
      }
      p {
        font-size: 18px;
      }
    }
    .v-image {
      height: 467px;
      top: -467px;
      left: 14px;
      width: 73vw;
    }
  }
}
</style>
