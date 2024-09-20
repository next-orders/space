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

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
      <UiActiveCard v-for="variant in product?.variants" :key="variant.id">
        <div class="flex flex-row gap-4 justify-center items-center">
          <Icon :name="icons.galleryItem" class="w-10 h-10 px-2 py-2 opacity-15" />
          <div>
            <div class="text-sm text-neutral-500">
              {{ variant.weightValue }}{{ variant.weightUnit }}
            </div>
            <div class="text-xl font-medium">
              {{ variant.gross }} ₽
            </div>
          </div>
        </div>
      </UiActiveCard>

      <UiActiveCard>
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

const { icons } = useAppConfig()
const { params } = useRoute()
const { t } = useI18n()

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
