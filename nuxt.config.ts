export default defineNuxtConfig({
  security: {
    headers: {
      crossOriginOpenerPolicy: 'allow-popups',
    },
  },
  image: {
    provider: "ipx"
},
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxthq/studio",
    "@vueuse/nuxt"
  ],
  plugins: ['~/plugins/firebase'],
  ui: {
    icons: ["heroicons", "lucide"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === 'production'
          ? { preset: ['default', { discardComments: { removeAll: true } }] }
         : false, // disable cssnano when not in production
    },
  },
  runtimeConfig: {
  apiKey: "AIzaSyC4Rtcrl9hdhvWDuRPB7fLKxETYGJqGFRw",
  authDomain: "vast-block-262207.firebaseapp.com",
  projectId: "vast-block-262207",
  storageBucket: "vast-block-262207.appspot.com",
  messagingSenderId: "864767740820",
  appId: "1:864767740820:web:4b732df9720c3edd939d81",
  measurementId: "G-WZG61JRCGN"
 }
});
