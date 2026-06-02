/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/**/*.stories.tsx',
  outDir: 'docs-build',
  viteConfig: 'vite.config.ts',
  base: '/bootstrap-styled/', // GitHub Pages sub-path
  defaultStory: 'getting-started--introduction',
}
