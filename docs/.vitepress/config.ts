import { defineConfig } from 'vitepress'

const ogDescription = 'An Opinionated front-end tooling'
const ogImage = 'https://tornado.brucesong.xyz/og-image.png'
const ogTitle = 'Tornado'
const ogUrl = 'https://tornado.brucesong.xyz'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tornado',
  description: 'An Opinionated front-end tooling',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }]
  ],

  themeConfig: {
    logo: '/logo.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get Started', link: '/guide/' },
          { text: 'Create Tornado', link: '/guide/create-tornado' },
          { text: 'Tornado X', link: '/guide/tornado-x' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/KZtqt2WXVr' },
      { icon: 'github', link: 'https://github.com/recallwei/tornado' }
    ],

    editLink: {
      pattern: 'https://github.com/recallwei/tornado/edit/main/docs/:path',
      text: 'Edit this page in GitHub'
    },

    footer: {
      message: `Released under the MIT License. Deploy by Vercel.`,
      copyright: 'Copyright © 2023-present Bruce Song'
    },

    outline: 'deep'
  }
})
