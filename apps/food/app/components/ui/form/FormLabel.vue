<template>
  <UiLabel
    :class="cn(
      error && 'text-red-500 dark:text-red-900',
      props.class,
    )"
    :for="formItemId"
    data-allow-mismatch
  >
    <slot />
  </UiLabel>
</template>

<script lang="ts" setup>
import type { LabelProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>
