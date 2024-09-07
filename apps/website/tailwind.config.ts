import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif', ...defaultTheme.fontFamily.serif],
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: 'rgb(var(--ui-background) / <alpha-value>)',
        foreground: 'rgb(var(--ui-foreground) / <alpha-value>)',
      },
    },
  },
}
