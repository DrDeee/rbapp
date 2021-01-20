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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
      ],
      brands: ['faWhatsapp'],
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  pwa: {
    manifest: {
      name: 'Regio-Buddy',
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
            'https://auth.fffutu.re/auth/realms/FridaysForFuture/protocol/openid-connect/auth',
          token:
            'https://auth.fffutu.re/auth/realms/FridaysForFuture/protocol/openid-connect/token',
          userInfo:
            'https://auth.fffutu.re/auth/realms/FridaysForFuture/protocol/openid-connect/userinfo',
        },
        token: {
          maxAge: 600,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: 'regio',
        scope: [],
        codeChallengeMethod: 'plain',
      },
    },
    plugins: ['~/plugins/is-admin.ts'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://buddy.berlinc.net/api/',
    https: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
