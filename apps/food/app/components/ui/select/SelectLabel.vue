<template>
  <SelectLabel :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>
