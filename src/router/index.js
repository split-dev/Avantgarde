import Vue from 'vue'
import VueRouter from 'vue-router'

import i18n from '@/i18n';
import { setDocumentLang } from '@/utils/i18n-document';
import { isLocaleSupported } from '@/utils/i18n-supported-locales';
import { loadLocaleMessages } from '@/i18n';

import Base from '../layouts/Base.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: i18n.locale
  },
  {
    path: "/:locale",
    name: 'LocaleWrap',
    component: Base,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      // https://github.com/storyblok/storyblok/issues/529
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: HomeView
      // },
      {
        path: 'careers',
        name: 'careers',
        component: () => import('../views/CareersView.vue')
      },
      {
        path: 'careers/diversity',
        name: 'diversity',
        component: () => import('../views/DiversityView.vue')
      },
      {
        path: 'careers/purpose',
        name: 'purpose',
        component: () => import('../views/PurposeView.vue')
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
      },
      {
        path: 'services/:serviceName?',
        name: 'services',
        component: () => import('../views/ServicesView.vue'),
        props: true
      },
      {
        path: 'locations/:locationName?',
        name: 'locations',
        component: () => import('../views/LocationsView.vue'),
        props: true,
      },
      {
        path: 'thoughts',
        name: 'thoughts',
        component: () => import('../views/ThoughtsView.vue')
      },
      {
        path: 'thoughts/:id',
        name: 'thought-detail',
        component: () => import('../views/ThoughtDetailView.vue'),
        props: true
      },
      {
        path: 'work',
        name: 'work',
        component: () => import('../views/WorkView.vue')
      },
      {
        path: 'work/:id',
        name: 'work-detail',
        component: () => import('../views/WorkDetailView.vue'),
        props: true
      },
      {
        path: 'location/:id',
        name: 'location-detail',
        component: () => import('../views/LocationDetailView.vue'),
        props: true
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'about/environmental',
        name: 'environmental',
        component: () => import('../views/AboutDetailView.vue'),
        props: { slug: 'environmental' }
      },
      {
        path: 'about/social',
        name: 'social',
        component: () => import('../views/AboutDetailView.vue'),
        props: { slug: 'social' }
      },
      {
        path: 'about/governance',
        name: 'governance',
        component: () => import('../views/AboutDetailView.vue'),
        props: { slug: 'governance' }
      },
      {
        path: 'imprint',
        name: 'imprint',
        component: () => import('../views/LegalView.vue'),
      },
      {
        path: 'data-protection',
        name: 'data-protection',
        component: () => import('../views/LegalView.vue'),
      },
      {
        path: 'terms-and-conditions',
        name: 'terms-and-conditions',
        component: () => import('../views/LegalView.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const { locale } = to.params;

  if (to.params.locale && to.params.locale === from.params.locale) {
    next();
    return;
  }

  if (!isLocaleSupported(locale)) {
    const localizedRoute = {
      path: `/${process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en'}${to.path}`,
      query: to.query,
    };

    const { resolved: { matched } } = router.resolve(localizedRoute);

    next(matched.length
      ? localizedRoute
      : {
        path: `/${process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en'}`,
        name: to.name,
        query: to.query,
      });

    return;
  }

  i18n.locale = locale;
  setDocumentLang(locale);
  loadLocaleMessages(locale);

  next();
})

export default router;
