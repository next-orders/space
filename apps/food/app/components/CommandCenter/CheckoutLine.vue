<template>
  <div class="mb-4 flex flex-row gap-2 items-center justify-between">
    <div class="max-w-[16rem] flex flex-row gap-2 flex-nowrap items-center">
      <div>
        <div class="font-medium leading-tight line-clamp-2">
          {{ line?.variant?.product?.name }}
        </div>
        <div class="mt-1 flex flex-row gap-2 flex-nowrap items-center">
          <p class="text-neutral-500 dark:text-neutral-400 leading-tight">
            {{ variant?.name }}
          </p>
          <p class="text-neutral-500 dark:text-neutral-400">
            {{ variant?.weightValue }}{{ getWeightLocalizedUnit(variant?.weightUnit) }}
          </p>
        </div>
      </div>
    </div>

    <div class="ml-auto">
      <div class="text-lg">
        x{{ line?.quantity }}
      </div>
    </div>

    <div class="min-w-[3rem] ml-0 md:ml-4 text-base md:text-lg text-right tracking-tight">
      {{ totalAmount }} <span class="text-xs">{{ getCurrencySign(channel?.currencyCode) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { lineId } = defineProps<{
  lineId: string
}>()

const { channel } = await useChannel()
const { checkouts } = await useCheckoutList()

const checkout = computed(() => checkouts.value?.find((c) => c.lines?.find((l) => l.id === lineId)))
const line = computed(() => checkout.value?.lines?.find((l) => l.id === lineId))
const totalAmount = computed(() => line.value ? getLocalizedPrice(line.value.variant?.gross * line.value.quantity) : 0)
const variant = computed(() => line.value?.variant)
</script>
