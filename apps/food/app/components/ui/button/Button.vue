<template>
  <button :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonVariants } from '.'

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
}

defineProps<Props>()
</script>
