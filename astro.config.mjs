// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://freemoser.github.io',
  base: '/balkon-bepflanzen.de',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/impressum') &&
        !page.includes('/datenschutz'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
