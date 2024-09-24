<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex w-full cursor-default select-none items-center rounded-xl py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
        props.class,
      )
    "
  >
    <span class="absolute left-2 top-2.5 flex h-4 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Icon :name="icons.check" class="h-4 w-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const { icons } = useAppConfig()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
