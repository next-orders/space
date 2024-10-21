<template>
  <UiActiveCard class="relative min-h-28 text-center flex flex-col items-center justify-center">
    <Icon :name="icons.moneyCard" class="w-8 h-8 text-neutral-300 dark:text-neutral-500" />

    <h3 class="text-lg font-semibold leading-tight">
      {{ paymentMethod?.name }}
    </h3>

    <p class="text-sm text-neutral-500 dark:text-neutral-400">
      {{ paymentMethod?.type }}
    </p>
  </UiActiveCard>
</template>

<script setup lang="ts">
const { paymentMethodId } = defineProps<{
  paymentMethodId: string
}>()

const { icons } = useAppConfig()
const { channel } = await useChannel()
const paymentMethod = computed(() => channel.value?.paymentMethods.find((p) => p.id === paymentMethodId))
</script>
