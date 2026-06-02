/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/**/*.stories.tsx',
  outDir: 'docs-build',
  viteConfig: 'vite.config.ts',
  base: '/bootstrap-styled/', // GitHub Pages sub-path
  defaultStory: 'getting-started--introduction',
  // Hoist Getting Started to the top; everything else stays alphabetical.
  storyOrder: (stories) => {
    const gs = stories.filter((s) => s.startsWith('getting-started'))
    const rest = stories.filter((s) => !s.startsWith('getting-started'))
    return [...gs, ...rest]
  },
}
