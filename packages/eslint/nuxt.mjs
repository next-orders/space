import antfu from '@antfu/eslint-config'
import { rules } from './default.mjs'

export default antfu(
  {
    typescript: true,
    vue: {
      overrides: {
        'ts/consistent-type-definitions': 'off',
        'vue/block-order': ['error', {
          order: ['template', 'script', 'style'],
        }],
      },
    },
    rules: {
      ...rules,
    },
  },
  {
    ignores: [
      'dist',
      '.output',
      '.nuxt',
      'node_modules',
    ],
  },
)
