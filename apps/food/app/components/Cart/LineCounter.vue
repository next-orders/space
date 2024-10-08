<template>
  <div class="flex flex-row justify-between items-center bg-neutral-100 dark:bg-neutral-700 w-20 min-w-[5.5rem] min-h-12 rounded-2xl px-1 py-2">
    <button
      aria-label="Minus"
      class="flex flex-row items-center px-1 py-1 rounded-xl lg:hover:scale-90 lg:hover:bg-neutral-200 dark:lg:hover:bg-neutral-800 duration-200"
      @click="changeLineQuantity(lineId, 'decrement')"
    >
      <Icon :name="icons.minus" class="w-5 h-5" />
    </button>

    <div class="text-base">
      {{ line?.quantity }}
    </div>

    <button
      aria-label="Plus"
      class="flex flex-row items-center px-1 py-1 rounded-xl lg:hover:scale-90 lg:hover:bg-neutral-200 dark:lg:hover:bg-neutral-800 duration-200"
      @click="changeLineQuantity(lineId, 'increment')"
    >
      <Icon :name="icons.plus" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { lineId } = defineProps<{
  lineId: string
}>()

const { icons } = useAppConfig()
const { checkout, changeLineQuantity } = useCheckout()
const line = computed(() => checkout.value?.lines?.find((l) => l.id === lineId))
</script>
