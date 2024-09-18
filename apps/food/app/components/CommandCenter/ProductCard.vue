<template>
  <NuxtLink :to="`/command-center/product/${productId}`">
    <UiActiveCard>
      <div class="flex flex-col justify-between h-full">
        <div class="relative w-full aspect-square">
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
                {{ variant.weightValue }}{{ getWeightLocalizedUnit(variant.weightUnit as WeightUnit) }}
              </p>
              <p class="font-medium">
                {{ getLocalizedPrice(variant.gross) }}<span class="pl-1 text-xs">₽</span>
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

const channelData = await useChannel()
const product = channelData.value?.products.find(({ id }) => id === productId)
const productImageUrl = '/burger-1.jpg'
</script>
