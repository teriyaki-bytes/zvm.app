import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zvm (Zig Version Manager)",
  description: "Easily install/upgrade between different versions of Zig.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installing ZVM', link: '/guide/install' },
          { text: 'How to Use ZVM', link: '/guide/how-to-use' },
          { text: 'Contributing to ZVM', link: '/guide/contributing' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tristanisham/zvm' }
    ]
  }
})
