<template>
  <UiActiveCard class="relative min-h-36 text-center flex flex-col items-center justify-center">
    <Icon :name="icons.house" class="w-12 h-12 opacity-15 mb-2" />

    <h3 class="text-xl font-semibold">
      {{ warehouse?.name }}
    </h3>

    <div>{{ warehouse?.address }}</div>
  </UiActiveCard>
</template>

<script setup lang="ts">
const { warehouseId } = defineProps<{
  warehouseId: string
}>()

const { icons } = useAppConfig()
const { channel } = await useChannel()
const warehouse = computed(() => channel.value?.warehouses.find((w) => w.id === warehouseId))
</script>
