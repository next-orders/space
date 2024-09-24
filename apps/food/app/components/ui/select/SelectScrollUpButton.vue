<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn('flex cursor-default items-center justify-center py-1', props.class)">
    <slot>
      <Icon :name="icons.arrowUp" class="h-4 w-4" />
    </slot>
  </SelectScrollUpButton>
</template>

<script setup lang="ts">
import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const { icons } = useAppConfig()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
