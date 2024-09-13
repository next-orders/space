<template>
  <Breadcrumbs :links="breadcrumbs" />

  <div class="bg-white dark:bg-neutral-600 px-5 py-5 rounded-2xl">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-0 gap-y-4 sm:gap-4">
      <div class="col-span-1 relative w-full aspect-square">
        <img
          :src="productImageUrl"
          alt=""
          priority
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          class="rounded-xl object-cover object-center"
        >
      </div>

      <div class="col-span-2">
        <h1 class="text-xl md:text-2xl lg:text-3xl font-medium">
          {{ product?.name }}
        </h1>
        <div class="mt-1 font-normal text-neutral-400">
          {{ productVariant?.weightValue }}
          {{ getWeightLocalizedUnit('G') }}
        </div>

        <div class="mt-4 flex flex-row gap-6 items-center">
          <div class="text-2xl font-medium tracking-tight">
            {{ getLocalizedPrice(productVariant?.gross) }} <span class="text-xl">₽</span>
          </div>

          <CartLineCounter v-if="inCart" :line-id="inCart.id" />
          <button
            v-else
            class="button-gradient px-5 py-3 flex flex-row gap-2 text-base font-normal cursor-pointer rounded-2xl active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
            @click="addProduct(productVariant?.id ?? '')"
          >
            <Icon :name="icons.basket" size="24" /> {{ $t('app.cart.add-to-cart') }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col xl:flex-row justify-between gap-4">
      <div v-if="product?.description">
        <div class="mb-1 font-medium text-neutral-400">
          {{ $t('common.description') }}
        </div>
        <div class="leading-snug">
          {{ product.description }}
        </div>
      </div>

      <div v-if="isNutritionShown">
        <div class="mb-1 font-medium text-neutral-400">
          На 100 грамм
        </div>
        <div class="mt-2 px-4 py-4 w-fit flex flex-row gap-4 bg-neutral-100 rounded-2xl">
          <div>
            <div class="font-medium">
              {{ per100gEnergy }}
            </div>
            <div>ккал</div>
          </div>
          <div>
            <div class="font-medium">
              {{ per100gProtein }} г
            </div>
            <div>белки</div>
          </div>
          <div>
            <div class="font-medium">
              {{ per100gFat }} г
            </div>
            <div>жиры</div>
          </div>
          <div>
            <div class="font-medium">
              {{ per100gCarbohydrate }} г
            </div>
            <div>углеводы</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: async ({ params }) => {
    const { error } = await useFetch(`/api/product/slug/${params.productSlug}`)
    return error.value === undefined
  },
})

const { t } = useI18n()
const { params } = useRoute()
const { icons } = useAppConfig()
const { addProduct, checkout } = await useCheckout()
const { data: product } = await useFetch(`/api/product/slug/${params.productSlug}`)

useHead({
  title: product.value?.name,
})

const productVariant = computed(() => product.value?.variants[0])

const inCart = computed(() => {
  return checkout.value?.lines?.find((l) => l.variant.id === productVariant.value?.id)
})

const breadcrumbs = computed(() => [
  { title: t('common.home'), href: '/' },
  {
    title: product.value?.category?.name ?? '',
    href: `/catalog/${product.value?.category?.slug}`,
  },
  { title: product.value?.name ?? '', href: '#' },
])

const productImageUrl = '/burger-1.jpg'

const per100gEnergy = 612
const per100gProtein = 21.9
const per100gCarbohydrate = 45.8
const per100gFat = 29.6
const isNutritionShown = true
</script>
