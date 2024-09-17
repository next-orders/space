<template>
  <div :class="cn('space-y-1', props.class)">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useId } from 'radix-vue'
import { type HTMLAttributes, provide } from 'vue'
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>
