<template>
  <Breadcrumbs :links="breadcrumbs" />

  <h1 class="text-2xl font-semibold mb-4">
    {{ menu?.name }}
  </h1>

  <div v-for="category in menu?.categories" :key="category.id" class="mb-8">
    <h2 class="text-xl pb-2 mb-4 border-b border-neutral-100">
      {{ category.name }}
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
      <CommandCenterProductCard v-for="product in category.products" :key="product.id" :product-id="product.id" />

      <CommandCenterProductCreateCard @click="() => { isModalOpened = true; categoryId = category.id }" />
    </div>
  </div>

  <CommandCenterModal :title="$t('center.create.product')">
    <form>
      <Input label="Название" />
      <Input label="Описание" />
    </form>
  </CommandCenterModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { isModalOpened } = useCommandCenter()
const { params } = useRoute()
const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.menu'),
    href: '/command-center/menu',
  },
  {
    title: t('center.menu.menu-page'),
    href: '#',
  },
])

const dataChannel = await useChannel()
const menu = computed(() => dataChannel.value?.menus?.find((menu) => menu.id === params.id))

const categoryId = ref()
</script>
