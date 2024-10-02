<template>
  <NuxtLink
    :to="productUrl"
    class="bg-white dark:bg-neutral-600 rounded-2xl h-auto w-auto max-w-[22rem] p-3 cursor-pointer active:scale-95 lg:active:scale-90 lg:hover:scale-95 duration-200"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <div class="relative w-full aspect-square">
          <ProductImage :id="product?.mediaId" />
        </div>

        <div class="mt-2 text-xl font-medium">
          {{ getLocalizedPrice(product?.variants[0]?.gross) }}<span class="pl-1 text-lg">{{ getCurrencySign(channel?.currencyCode) }}</span>
        </div>
        <p class="font-normal leading-tight line-clamp-2">
          {{ product?.name }}
        </p>
        <div class="mt-2 font-light text-neutral-500 dark:text-white">
          {{ weightValue }}{{ weightUnitLocalized }}
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center justify-center mt-2 w-full h-12 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
        <Icon :name="icons.plus" class="w-5 h-5" />
        <div class="text-center text-base font-normal">
          {{ $t('app.cart.add') }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { productId } = defineProps<{
  productId: string
}>()

const { icons } = useAppConfig()
const { channel, categories } = await useChannel()
const { products } = await useProduct()
const product = computed(() => products.value?.find(({ id }) => id === productId))

const weightValue = product.value?.variants[0]?.weightValue
const weightUnitLocalized = getWeightLocalizedUnit(product.value?.variants[0]?.weightUnit)

const categorySlug = categories.value.find(({ id }) => id === product.value?.categoryId)?.slug
const productUrl = `/catalog/${categorySlug}/${product.value?.slug}`
</script>
