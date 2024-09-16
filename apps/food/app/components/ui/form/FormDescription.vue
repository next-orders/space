<template>
  <p
    :id="formDescriptionId"
    :class="cn('text-sm text-neutral-500 dark:text-neutral-400', props.class)"
    data-allow-mismatch
  >
    <slot />
  </p>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>
