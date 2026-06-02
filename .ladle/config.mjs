/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/**/*.stories.tsx',
  outDir: 'docs-build',
  viteConfig: '.ladle/vite.config.ts',
  base: '/bootstrap-styled/', // GitHub Pages sub-path
  defaultStory: 'getting-started--introduction',
  // Hoist Getting Started to the top; everything else stays alphabetical.
  storyOrder: (stories) => {
    const gs = stories.filter((s) => s.startsWith('getting-started'))
    const rest = stories.filter((s) => !s.startsWith('getting-started'))
    return [...gs, ...rest]
  },

  // Inject logo + GitHub link into the sidebar header.
  appendToHead: `
<style>
  /* Logo + GitHub header above the search box */
  .ladle-aside::before {
    content: '';
    display: block;
    height: 112px;
    background: #6e2c92;
    background-image: url('./assets/transparent-logo.svg');
    background-size: 72px 72px;
    background-repeat: no-repeat;
    background-position: center 12px;
    flex-shrink: 0;
  }

  /* GitHub link bar below the logo strip */
  #ladle-gh-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #5a2278;
    padding: 6px 12px;
    font-size: 11px;
    font-family: system-ui, sans-serif;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    transition: background 0.15s;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  #ladle-gh-link:hover { background: #7c3aed; color: #fff; }
  #ladle-gh-link svg { flex-shrink: 0; }
</style>
<script>
  (function() {
    var GH_SVG = '<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
    function mount() {
      var aside = document.querySelector('.ladle-aside');
      if (!aside || document.getElementById('ladle-gh-link')) return;
      var a = document.createElement('a');
      a.id = 'ladle-gh-link';
      a.href = 'https://github.com/nhunsaker/bootstrap-styled';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = GH_SVG + ' nhunsaker/bootstrap-styled';
      aside.insertBefore(a, aside.firstChild);
    }
    // Observe from the very start — .ladle-aside mounts after React renders.
    var obs = new MutationObserver(function() { mount(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    // Also try immediately in case it's already in the DOM.
    mount();
  })();
</script>
`,
}
