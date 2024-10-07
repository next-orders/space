<template>
  <div class="mb-4 flex flex-row gap-2 items-center justify-between">
    <NuxtLink :to="productUrl">
      <div class="max-w-[15rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200 group">
        <div class="relative w-14 h-14 aspect-square">
          <ProductImage :id="line?.variant?.product?.mediaId" size="xs" class="xl:grayscale xl:contrast-75 xl:brightness-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100" />
        </div>

        <div>
          <p class="font-base text-xs leading-tight line-clamp-2">
            {{ line?.variant?.product?.name }}
          </p>
          <div class="mt-1 flex flex-row gap-2 flex-nowrap">
            <div class="text-sm font-medium tracking-tight">
              {{ getLocalizedPrice(line?.variant?.gross) }} <span class="text-xs">{{ getCurrencySign(channel?.currencyCode) }}</span>
            </div>
            <div class="text-sm text-neutral-500 dark:text-white font-light">
              {{ variant?.weightValue }}{{ getWeightLocalizedUnit(variant?.weightUnit) }}
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>

    <CartLineCounter :line-id="lineId" />
  </div>
</template>

<script setup lang="ts">
const { lineId } = defineProps<{
  lineId: string
}>()

const { channel } = await useChannel()
const { checkout } = useCheckout()
const line = computed(() => checkout.value?.lines?.find((l) => l.id === lineId))
const variant = computed(() => line.value?.variant)
const product = computed(() => line.value?.variant?.product)
const productUrl = computed(() => `/catalog/${product.value?.category?.slug}/${product.value?.slug}`)
</script>
