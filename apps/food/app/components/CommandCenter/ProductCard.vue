<template>
  <NuxtLink :to="`/command-center/product/${productId}`">
    <UiActiveCard :class="{ 'opacity-75': isWarning }">
      <div class="flex flex-col justify-between h-full">
        <div class="relative w-full aspect-square">
          <div class="z-10 absolute top-1 left-1">
            <div v-if="isWarning" class="px-2 py-1 bg-white rounded-xl">
              <Icon :name="icons.alert" class="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <img
            :src="productImageUrl"
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            class="rounded-xl object-cover object-center"
          >
        </div>

        <div class="h-full flex flex-col justify-between">
          <p class="mt-2 text-lg leading-tight line-clamp-2">
            {{ product?.name }}
          </p>

          <div class="mt-4">
            <div v-for="variant in product?.variants" :key="variant.id" class="flex justify-between">
              <p class="text-neutral-500 dark:text-white">
                {{ variant.weightValue }}{{ getWeightLocalizedUnit(variant.weightUnit) }}
              </p>
              <p class="font-medium">
                {{ getLocalizedPrice(variant.gross) }}<span class="pl-1 text-xs">{{ getCurrencySign(channel?.currencyCode) }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </UiActiveCard>
  </NuxtLink>
</template>

<script setup lang="ts">
const { productId } = defineProps<{
  productId: string
}>()

const { icons } = useAppConfig()
const { channel } = await useChannel()
const { products } = await useProduct()
const product = computed(() => products.value?.find(({ id }) => id === productId))
const productImageUrl = '/burger-1.jpg'
const isWarning = computed(() => product.value?.variants.length === 0 || !product.value?.isAvailableForPurchase)
</script>
