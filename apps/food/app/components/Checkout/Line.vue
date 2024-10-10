<template>
  <div class="mb-4 flex flex-row gap-2 items-center justify-between">
    <NuxtLink :to="productUrl">
      <div class="max-w-[16rem] flex flex-row gap-2 flex-nowrap items-center cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200 group">
        <div class="relative w-12 h-12 md:w-14 md:h-14 aspect-square">
          <ProductImage :id="line?.variant?.product?.mediaId" size="xs" />
        </div>

        <div>
          <div class="font-medium leading-tight line-clamp-2">
            {{ line?.variant?.product?.name }}
          </div>
          <div class="mt-1 flex flex-row gap-2 flex-nowrap items-center">
            <p class="text-sm text-neutral-500 leading-tight">
              {{ variant?.name }}
            </p>
            <p class="text-sm text-neutral-500">
              {{ variant?.weightValue }}{{ getWeightLocalizedUnit(variant?.weightUnit) }}
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>

    <div class="ml-auto">
      <CartLineCounter :line-id="lineId" />
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
const { checkout } = useCheckout()
const line = computed(() => checkout.value?.lines?.find((l) => l.id === lineId))
const totalAmount = computed(() => line.value ? getLocalizedPrice(line.value.variant?.gross * line.value.quantity) : 0)
const variant = computed(() => line.value?.variant)
const product = computed(() => line.value?.variant?.product)
const productUrl = computed(() => `/catalog/${product.value?.category?.slug}/${product.value?.slug}`)
</script>
