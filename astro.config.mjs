// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Change `site` to your live URL once deployed (used for canonical links / sitemap).
  site: 'https://year9-maths.vercel.app',

  integrations: [
    // `compat: true` lets us write React-flavoured code (React.forwardRef, etc.)
    // while shipping Preact's ~4 KB runtime instead of React's ~45 KB.
    preact({ compat: true }),
  ],

  markdown: {
    // $inline$ and $$display$$ maths in lesson Markdown is rendered to static
    // HTML at BUILD time, so the browser never downloads a maths library.
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }]],
    shikiConfig: { theme: 'github-light' },
  },

  build: {
    // Emit `/lessons/foo/index.html` so links work on any static host.
    format: 'directory',
  },

  vite: {
    build: {
      // Keep chunks small for mobile data.
      chunkSizeWarningLimit: 700,
    },
  },
});
