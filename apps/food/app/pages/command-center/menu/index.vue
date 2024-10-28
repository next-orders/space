<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
    <h1 class="text-2xl md:text-3xl font-semibold">
      {{ t('center.menu.title') }}
    </h1>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
    <CommandCenterMenuCard v-for="menu in menus" :key="menu.id" :menu-id="menu.id" />
    <CommandCenterMenuCreateCard @click="isModalOpened = true" />
  </div>

  <GuideMenus />

  <UiModal :title="$t('center.create.menu')" :is-opened="isModalOpened" @close="isModalOpened = false">
    <FormCreateMenu :is-opened="isModalOpened" @success="isModalOpened = false" />
  </UiModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['02-staff'],
})

const isModalOpened = ref(false)
const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.title'),
    href: '#',
  },
])

const { menus } = await useChannel()
</script>
