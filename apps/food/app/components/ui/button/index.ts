import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'w-full rounded-2xl text-base font-medium ring-offset-background active:scale-95 md:active:scale-90 hover:scale-95 duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br hover:bg-gradient-to-r from-lime-100 to-emerald-200 font-medium text-neutral-950 dark:text-neutral-950',
        destructive: 'bg-amber-200 hover:bg-amber-200/90',
        secondary: 'bg-neutral-100 dark:bg-neutral-500 border border-neutral-200 dark:border-neutral-500 hover:bg-neutral-200/60 dark:hover:bg-neutral-500/60',
        ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-600',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
