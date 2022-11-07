import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import LogoIcon from '../components/icons/LogoIcon';
import ArrowIcon from '../components/icons/ArrowIcon';
import MenuIcon from '../components/icons/MenuIcon';
import CloseIcon from '../components/icons/CloseIcon';
import InstaIcon from "@/components/icons/InstaIcon";
import LnkdnIcon from "@/components/icons/LnkdnIcon";
import FbIcon from "@/components/icons/FbIcon";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {/**/},
    icons: {
        values: {
            logo: {
                component: LogoIcon,
            },
            arrow: {
                component: ArrowIcon,
            },
            hamburger: {
                component: MenuIcon,
            },
            close: {
                component: CloseIcon,
            },
            insta: {
                component: InstaIcon,
            },
            lnkdn: {
                component: LnkdnIcon,
            },
            fb: {
                component: FbIcon,
            },
        },
    },
});
