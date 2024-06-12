// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  dirs: {
    src: ['./playground'],
  },
}).append({
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [],
      },
    ],
  },
})
