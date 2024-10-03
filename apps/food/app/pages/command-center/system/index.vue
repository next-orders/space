<template>
  <UiBreadcrumb :links="breadcrumbs" />

  <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
    <h2 class="text-2xl md:text-3xl font-semibold">
      Склады
    </h2>

    <div class="flex flex-col md:flex-row gap-4">
      <UiButton class="w-full md:w-fit" @click="isCreateWarehouseOpened = true">
        Добавить склад
      </UiButton>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2">
    <UiActiveCard v-for="warehouse in channel?.warehouses" :key="warehouse.id">
      <div class="text-xl font-semibold">
        {{ warehouse.name }}
      </div>
      <div>
        {{ warehouse.address }}
      </div>
    </UiActiveCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { t } = useI18n()
const { channel } = await useChannel()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.settings'),
    href: '#',
  },
])

const isCreateWarehouseOpened = ref(false)
</script>
