<template>
  <UiBreadcrumb :links="breadcrumbs" />

  <div class="mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
    <div>
      <h1 class="mb-1 text-2xl md:text-3xl font-semibold">
        {{ product?.name }}
      </h1>
      <p class="text-neutral-500">
        /{{ product?.slug }}
      </p>
    </div>

    <div class="px-4 py-4 bg-neutral-50 rounded-2xl">
      <div class="flex items-center space-x-2">
        <UiSwitch id="product-switch" />
        <UiLabel for="product-switch">
          Активен
        </UiLabel>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
    <div class="relative w-full aspect-square">
      <img
        :src="productImageUrl"
        alt=""
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
        class="rounded-xl object-cover object-center"
      >
    </div>

    <div class="md:col-span-2">
      <p v-if="product?.description">
        {{ product?.description }}
      </p>
      <p v-else class="text-neutral-500">
        [Описания пока нет]
      </p>
    </div>
  </div>

  <div class="mt-8">
    <div class="mb-4 pb-2 flex flex-row gap-3 items-center border-b border-neutral-100">
      <Icon :name="icons.gallery" class="w-6 h-6 opacity-25" />
      <h2 class="text-2xl lg:text-xl">
        Вариации продукта
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
      <UiActiveCard v-for="variant in product?.variants" :key="variant.id" class="space-y-3 flex flex-col justify-between">
        <div class="flex flex-row flex-nowrap gap-2">
          <Icon :name="icons.galleryItem" class="w-6 h-6 opacity-15 flex-none" />

          <div class="text-md font-medium leading-tight grow-0">
            {{ variant.name }}
          </div>
        </div>

        <div class="py-3 flex flex-row flex-nowrap gap-6 items-center justify-center bg-white rounded-xl">
          <div class="text-lg font-medium">
            {{ variant.gross }} {{ getCurrencySign(channel?.currencyCode) }}
          </div>
          <div class="text-md text-neutral-500">
            {{ variant.weightValue }}{{ getWeightLocalizedUnit(variant.weightUnit) }}
          </div>
        </div>

        <div v-if="variant.calories" class="flex flex-row gap-3 justify-center text-neutral-500">
          <div v-if="variant.calories">
            {{ variant.calories }}{{ $t('common.abbreviation.kcal') }}
          </div>
          <div v-if="variant.protein">
            {{ variant.protein }}{{ $t('common.abbreviation.g') }}
          </div>
          <div v-if="variant.fat">
            {{ variant.fat }}{{ $t('common.abbreviation.g') }}
          </div>
          <div v-if="variant.carbohydrate">
            {{ variant.carbohydrate }}{{ $t('common.abbreviation.g') }}
          </div>
        </div>
      </UiActiveCard>

      <UiActiveCard @click="isCreateProductVariantOpened = true">
        <div class="h-full flex flex-row gap-3 justify-center items-center">
          <img
            src="~/assets/img/green-notebook.png"
            width="64"
            height="64"
            alt=""
            class="w-10 h-10"
          >

          <div class="text-lg leading-tight">
            Добавить
          </div>
        </div>
      </UiActiveCard>
    </div>
  </div>

  <CommandCenterModal :title="$t('center.create.product-variant')" :is-opened="isCreateProductVariantOpened" @close="() => isCreateProductVariantOpened = false">
    <FormCreateProductVariant :product-id="product?.id ?? ''" :is-opened="isCreateProductVariantOpened" @success="() => isCreateProductVariantOpened = false" />
  </CommandCenterModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
  validate: async ({ params }) => {
    const { error } = await useFetch(`/api/product/${params.id}`)
    return error.value === undefined
  },
})

const isCreateProductVariantOpened = ref(false)

const { icons } = useAppConfig()
const { params } = useRoute()
const { t } = useI18n()

const { channel } = await useChannel()
const { products } = await useProduct()
const product = computed(() => products.value?.find((p) => p.id === params.id))

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.product-page'),
    href: '#',
  },
])

const productImageUrl = '/burger-1.jpg'
</script>
