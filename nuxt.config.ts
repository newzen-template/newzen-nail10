export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  generate: {
    routes: ['/contact','/gallery','/','/place','/services','/blog/','/blog/post1','/blog/post2','/blog/category/new-1','/blog/category/new-2','/blog/category/new-9','/blog/category/new-3','/blog/category/new-6','/blog/tags/beauty-tips','/blog/tags/her-nail','/blog/tags/des-peres','/blog/tags/missouri','/blog/tags/luxury-salon'],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  plugins: ['@/plugin/addRoutes.ts'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@/assets/style/main.scss',
  ],

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],

  content: {
    documentDriven: true,
    highlight: {
      theme: 'light-plus',
    },
  },

  components: {
    global: true,
    dirs: ['~/components', '~/plugin'],
  },

  build: {
    transpile: ['newzen-connector'],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/sitemap.xml'],
    },
    hooks: {
      'prerender:done': (result) => {
        result.failedRoutes.map((value, index) => {
          if (value.error) {
            console.warn(
              `Skipping 404 (Document not found) for route: ${value.error?.statusMessage}`
            );

            if (
              value.error?.statusCode === 404 &&
              value.error?.statusMessage === 'Document not found!'
            ) {
              console.warn(
                `Skipping 404 (Document not found) for route: ${value.fileName}`
              );
              result.prerenderedRoutes[index].skip = true;
              return;
            }
            if (value.error?.statusCode === 500 && value.route === '/blog/') {
              console.warn(`Skipping 500 error for /blog/ ${value.fileName}`);
              result.prerenderedRoutes[index].skip = true;
              return;
            }
            result.prerenderedRoutes[index].skip = false;
            console.error(
              `Error detected on route ${result.prerenderedRoutes[index].route}:`,
              value.error
            );
            throw value.error;
          }
        });
      },
    },
  },

  compatibilityDate: '2025-01-14',
});
