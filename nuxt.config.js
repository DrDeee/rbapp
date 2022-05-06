export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Regio-Buddy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: '/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/iphonexr_splash.png',
        media:
          'device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        href: '/splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/real-screen-height.client.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  fontawesome: {
    icons: {
      solid: [
        'faPhone',
        'faCopy',
        'faEllipsisH',
        'faEdit',
        'faHome',
        'faUser',
        'faUserFriends',
        'faSave',
        'faTimes',
        'faShare',
        'faCheckCircle',
        'faSpinner',
        'faFilter',
        'faTrash',
        'faCaretDown',
        'faCaretUp',
      ],
      brands: ['faWhatsapp'],
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  pwa: {
    manifest: {
      name: 'Regio-Buddy',
      short_name: 'Regio-Buddy',
      description:
        'Diese App ermöglicht es dir Regio-Buddy für Fridays for Future zu sein und mit uns Klimastreiks zu organisieren',
      lang: 'de',
      theme_color: '#1B7340',
    },
  },

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: false,
      cloud: {
        scheme: 'oauth2',
        endpoints: {
          authorization:
            (process.env.KC_REALM ||
              ' https://auth.fffutu.re/auth/realms/FridaysForFuture') +
            '/protocol/openid-connect/auth',
          token:
            (process.env.KC_REALM ||
              ' https://auth.fffutu.re/auth/realms/FridaysForFuture') +
            '/protocol/openid-connect/token',
          userInfo:
            (process.env.KC_REALM ||
              ' https://auth.fffutu.re/auth/realms/FridaysForFuture') +
            '/protocol/openid-connect/userinfo',
        },
        token: {
          maxAge: 600,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.OIDC_CLIENT || 'regio',
        scope: [],
        codeChallengeMethod: 'plain',
      },
    },
    plugins: ['~/plugins/is-admin.ts', '~/plugins/util.ts'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL || 'https://api.regiobuddy.app/',
    https: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
