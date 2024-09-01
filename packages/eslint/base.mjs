import antfu from '@antfu/eslint-config'
import { rules } from './default.mjs'

export default antfu(
  {
    typescript: true,
    rules: {
      ...rules,
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
    ],
  },
)
