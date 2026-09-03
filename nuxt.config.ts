export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: '.',
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  app: {
    head: {
      title: 'U本位永续合约交易教程',
      htmlAttrs: {
        lang: 'zh-CN',
      },
      meta: [
        {
          name: 'description',
          content: '面向零基础用户的 U 本位永续合约交易教育网站，不是交易信号、荐股或自动交易系统。',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
