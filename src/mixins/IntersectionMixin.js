import gsap from "gsap";

export const intersectionMixin = {
    data:() =>({
        activeViews: new Set(),
        activeViewsString: '',
        footerIntersecting: false,
    }),
    methods: {
        onIntersectSection(entries, observer, isIntersecting) {
            entries.forEach((entry) => {
                const isStartIntersecting = entry.intersectionRatio >= (this.$vuetify.breakpoint.mobile ? 0.1 : 0.2);
                const isContinueIntersecting = entry.intersectionRatio >= 0.3;
                const isHalfIntersecting = entry.intersectionRatio >= (this.$vuetify.breakpoint.mobile ? 0.2 : 0.5);
                const isEndIntersecting = entry.intersectionRatio >= (this.$vuetify.breakpoint.mobile ? 1.0 : 0.8);

                entry.target.classList[isIntersecting ? 'add' : 'remove']('active');
                entry.target.classList[isHalfIntersecting ? 'add' : 'remove']('active-animate05');
                entry.target.classList[isStartIntersecting ? 'add' : 'remove']('active-animate02');
                entry.target.classList[isContinueIntersecting ? 'add' : 'remove']('active-animate03');
                entry.target.classList[isEndIntersecting ? 'add' : 'remove']('active-animate08');

                isHalfIntersecting && entry.target.classList.add('active-animated05');
                if (isIntersecting) {
                    this.activeViews.add(entry.target.getAttribute('data-section'));
                } else {
                    this.activeViews.delete(entry.target.getAttribute('data-section'));
                }
            });

            this.activeViewsString = [...this.activeViews].join(' ');
        },
        onWheelFooter(e) {
            if (this.footerIntersecting && (document.scrollingElement.scrollHeight > window.outerHeight)) {
                const scrolled = document.scrollingElement.scrollTop + window.innerHeight;
                const delta = e.deltaY;
                const coeficient = Math.abs((window.innerHeight / window.innerWidth) - 1);

                if (document.scrollingElement.scrollHeight <= scrolled) {
                    /* scrolled to end */
                    if (delta < 0) {
                        gsap.set(this.$refs.footer.$el, {
                            marginTop: `+=${delta * coeficient}`,
                            /*paddingTop: `-=${delta * 0.5}`,
                            borderTop: '1px solid #b5b5b5'*/
                        });
                    }
                } else {
                    const currentMg = parseInt(gsap.getProperty(this.$refs.footer.$el, "marginTop"), 10);
                    const footerHeight = parseInt(gsap.getProperty(this.$refs.footer.$el, "height"), 10);

                    if (currentMg > 0 || Math.abs(currentMg) >= footerHeight) {
                        gsap.set(this.$refs.footer.$el, {
                            marginTop: 0,
                            /*paddingTop: 0,
                            borderTop: '0px solid #b5b5b5'*/
                        });
                    } else {
                        gsap.set(this.$refs.footer.$el, {
                            marginTop: `-=${delta * coeficient}`,
                            /*paddingTop: `+=${delta * 0.5}`,
                            borderTop: '1px solid #b5b5b5'*/
                        });
                    }
                }
            }
        },
        onIntersectFooter(entries, observer, isIntersecting) {
            this.footerIntersecting = isIntersecting;
            this.onIntersectSection(entries, observer, isIntersecting);
        }
    }
}
