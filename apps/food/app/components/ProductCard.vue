<template>
  <NuxtLink
    :to="productUrl"
    class="bg-white dark:bg-neutral-600 rounded-2xl h-auto w-auto p-3 cursor-pointer active:scale-95 lg:active:scale-90 lg:hover:scale-95 duration-200"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <div class="relative w-full aspect-square">
          <ProductImage :id="product?.mediaId" :lazy="lazy" size="sm" />
        </div>

        <div class="mt-2 text-xl font-medium">
          <span v-if="!withSingleVariant" class="pr-1">{{ $t('app.cart.from') }}</span>
          <span>{{ price }}</span>
          <span class="pl-1 text-lg">{{ getCurrencySign(channel?.currencyCode) }}</span>
        </div>
        <p class="font-normal leading-tight line-clamp-2">
          {{ product?.name }}
        </p>
        <div class="mt-2 font-light text-neutral-500 dark:text-white">
          <span v-if="!withSingleVariant" class="pr-1">{{ $t('app.cart.from') }}</span>
          <span>{{ weightValue }}{{ weightUnit }}</span>
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
  lazy?: boolean
}>()

const { icons } = useAppConfig()
const { channel, categories } = await useChannel()
const { products } = await useProduct()
const product = computed(() => products.value?.find(({ id }) => id === productId))

const withSingleVariant = computed(() => product.value?.variants.length === 1)
const smallestVariant = computed(() => withSingleVariant.value ? product.value?.variants[0] : product.value?.variants.reduce((prev, curr) => (prev.gross < curr.gross ? prev : curr)))

const price = computed(() => getLocalizedPrice(smallestVariant.value?.gross))
const weightValue = computed(() => smallestVariant.value?.weightValue)
const weightUnit = computed(() => getWeightLocalizedUnit(smallestVariant.value?.weightUnit))

const categorySlug = categories.value.find(({ id }) => id === product.value?.categoryId)?.slug
const productUrl = `/catalog/${categorySlug}/${product.value?.slug}`
</script>
