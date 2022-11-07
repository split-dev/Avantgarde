<template>
  <SectionPrototype
    :abobeLine="true"
    :verticalTitle="verticalTitle"
    :className="`big-text-section tw-bg-white md:tw-bg-transparent ${className} ${
      centered ? 'centered text-center' : ''
    }`"
    container-class-name="big-text-container"
    theme="light"
  >
    <h2
      class="big-text events-none"
      :class="centered ? 'w-100' : 'invisible'"
      v-html="text"
    ></h2>
    <h2
      class="big-text events-none position-absolute  xl:tw-text-[170px] xl:tw-leading-[170px] xl:tw-mt-[166px]"
      v-html="text"
      v-if="!centered"
    ></h2>
    <slot />
    <div :class="`line-bg line-bg-type${lineType}`"></div>
  </SectionPrototype>
</template>

<script>
import SectionPrototype from "@/components/SectionPrototype";

/* https://greensock.com/docs/ */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: "BigTextSection",
  props: {
    verticalTitle: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    lineType: {
      type: String
    },
    centered: {
      type: Boolean,
      default: false,
    },
    noAnimated: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
    },
    theme: {
      type: String,
    },
  },
  components: {
    SectionPrototype,
  },
  data: () => ({
    tl: null
  }),
  beforeDestroy() {
    this.tl?.pause(0).kill(true);
    this.tl = null;
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
  },
  methods: {
    runAnimation(entries, observer, isIntersecting) {
      if (!this.noAnimated && isIntersecting) {
        this.tl?.pause(0).kill(true);
        this.tl = gsap.timeline({
          defaults: {ease: "none"},
          scrollTrigger: {
            trigger: this.$refs.fixedText,
            scrub: true,
            start: '-=50% bottom',
            end: '200% top'
          }})
            .fromTo(this.$refs.animatedText, {
              lineHeight: 4,
              marginTop: '-10%',
              opacity: 0,
            },{
              lineHeight: 1,
              opacity: 1,
              marginTop: '0',
              duration: 1
            }, 0)
            .to(this.$refs.animatedText, {
              lineHeight: 4,
              opacity: 0,
              marginTop: this.$vuetify.breakpoint.mobile ? '-100%' : '-200%',
              duration: 1
            }, 1.3)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.big-text-section {
  padding: 194px 76px 239px 102px;
  position: relative;
  ::v-deep .big-text.position-absolute {
    padding-right: 94px;
  }
  .line-bg {
    pointer-events: none;
    display: block;
    content: "";
    position: absolute;
    &-type1 {
      width: 38%;
      height: 75%;
      right: 0;
      bottom: 0;
      background-size: 133%;
      background-position: left bottom;
      background-image: url("data:image/svg+xml,%3Csvg width='1420' height='1681' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(-11 710 841)'%3E%3Cpath d='M-145.255 1530.392s16.998-201.252 233.496-190.882c216.499 10.37 403.605 178.568 555.613 166.378 152.008-12.19-11.623-271.287 178.313-369.588 189.936-98.302 353.99-139.321 273.233-355.41-80.758-216.089 212.753-608.741 470.658-628.502' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
    }
    &-type2 {
      width: 83%;
      height: 100%;
      left: 0;
      bottom: 0;
      background-size: 112%;
      background-position: right bottom -2%;
      background-image: url("data:image/svg+xml,%3Csvg width='1759' height='521' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(63 879.5 260.5)'%3E%3Cpath d='M267.222 953.346s-18.64-217.1 165.358-208.286c183.999 8.814 148.567 46.518 277.757 36.158s-11.675-255.55 149.75-339.095c161.424-83.546 300.852-118.407 232.216-302.059-68.635-183.651 180.818-517.36 400.008-534.157' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
    }
    &-type3 {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-size: 61%;
      background-position: right bottom;
      background-image: url("data:image/svg+xml,%3Csvg width='989' height='1179' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(-2 495 590)'%3E%3Cpath d='M-17.426 1161.431s-15.616-184.108 138.532-176.634c154.149 7.474 124.466 39.448 232.697 30.663 108.231-8.786-9.781-216.717 125.455-287.567 135.237-70.85 252.046-100.414 194.545-256.158-57.5-155.743 151.483-438.742 335.114-452.986' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
    }
    &-type4 {
      background-image: url("data:image/svg+xml,%3Csvg width='1920' height='929' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(14 1197.5 215.5)' clip-path='url(%23clip-75713fe4-ec37-45dd-92a1-8433c5755811)'%3E%3Cpath d='M115.282 1143.228s21.509-254.645 295.442-241.523c273.935 13.122 510.142 63.706 702.477 48.283 192.336-15.424-14.707-343.26 225.62-467.64 240.325-124.381 447.903-176.282 345.719-449.699-102.182-273.418 269.198-770.238 595.524-795.244' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
      background-position: left bottom 50px;
      width: 100% !important;
      height: 100% !important;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  @media (max-width: $media-md) {
    overflow: hidden;
  }
  @media (max-width: $media-sm) {
    padding: 23px 18px 117px 22px;
    border-top: 1px solid $border-color;
    ::v-deep .big-text.position-absolute {
      padding-right: 0;
    }
    ::v-deep .container {
      padding-left: 0 !important;
    }
    .line-bg {
      width: 20%;
    }
    .line-bg-type2 {
      left: 43%;
      bottom: 0;
      background-size: 112%;
      background-position: left bottom;
      background-image: url("data:image/svg+xml,%3Csvg width='1420' height='1681' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='rotate(-11 710 841)'%3E%3Cpath d='M-145.255 1530.392s16.998-201.252 233.496-190.882c216.499 10.37 403.605 178.568 555.613 166.378 152.008-12.19-11.623-271.287 178.313-369.588 189.936-98.302 353.99-139.321 273.233-355.41-80.758-216.089 212.753-608.741 470.658-628.502' fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E");
      width: 90%;
    }
  }
  &--decor-2 {
    &:after,
    &::after {
      @media (min-width: $media-sm) {
        height: 35%;
        width: 92%;
        right: auto;
        left: -17%;
        background-size: cover;
        background-position: right bottom;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1759' height='521' viewBox='0 0 1759 521'%3E%3Cg%3E%3Cg transform='rotate(63 879.5 260.5)'%3E%3Cpath fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2' d='M267.222 953.346v0s-18.64-217.1 165.358-208.286c183.999 8.814 148.567 46.518 277.757 36.158s-11.675-255.55 149.75-339.095c161.424-83.546 300.852-118.407 232.216-302.059-68.635-183.651 180.818-517.36 400.008-534.157'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      @media (max-width: $media-sm) {
        width: 117%;
        height: 75%;
        right: -36%;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='457' height='541' viewBox='0 0 457 541'%3E%3Cg%3E%3Cg transform='rotate(-11 229 271)'%3E%3Cpath fill='none' stroke='%2372fdda' stroke-miterlimit='20' stroke-width='2' d='M-45.63 492.157v0s5.456-64.597 74.946-61.268c69.491 3.329 129.549 57.317 178.34 53.404 48.791-3.913-3.73-87.077 57.234-118.63 60.966-31.553 113.623-44.719 87.702-114.078-25.921-69.36 68.29-195.393 151.07-201.736'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
    }
  }
}

.big-intro-text-section {
  padding: 165px 62px 74px 0 !important;
  ::v-deep .big-text.position-absolute {
    padding-right: 86px;
  }
  ::v-deep .big-text-container {
    padding-left: 103px;
    @media (max-width: $media-sm) {
      padding-left: 0;
    }
  }
  ::v-deep .big-text:not(.invisible) {
    z-index: 2 !important;
  }
  @media (max-width: 1500px) {
    padding-right: 0 !important;
  }
  @media (max-width: $media-sm) {
    padding: 43px 10px 74px 30px !important;
    .big-text.position-absolute {
      padding-right: 30px;
    }
    .line-bg {
      display: none;
    }
  }
}
/* animation dependency */
.big-text {
  font-size: 175px;
  white-space: pre-wrap;
  &.invisible {
    visibility: hidden;
    line-height: 1;
    margin: 0 0;
  }
  @media (max-width: 1600px) {
    font-size: 130px;
  }
  @media (max-width: $media-md) {
    font-size: 100px;
  }
  @media (max-width: $media-sm) {
    font-size: 50px;
  }

  ::v-deep span {
    color: $cyan-color;
  }
}

.big-text-section, .big-intro-text-section {
  &.no-animation {
    .big-text {
      line-height: 1;
      opacity: 1;
    }
  }
}
</style>
