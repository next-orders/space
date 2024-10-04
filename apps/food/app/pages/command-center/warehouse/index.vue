<template>
  <UiBreadcrumb :links="breadcrumbs" />

  <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
    <h1 class="text-2xl md:text-3xl font-semibold">
      {{ t('center.menu.warehouses') }}
    </h1>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2">
    <CommandCenterWarehouseCard v-for="warehouse in channel?.warehouses" :key="warehouse.id" :warehouse-id="warehouse.id" @click="() => { warehouseId = warehouse.id; isUpdateWarehouseOpened = true }" />
    <CommandCenterWarehouseCreateCard @click="isCreateWarehouseOpened = true" />
  </div>

  <CommandCenterModal :title="$t('center.create.warehouse')" :is-opened="isCreateWarehouseOpened" @close="() => isCreateWarehouseOpened = false">
    <FormCreateWarehouse :is-opened="isCreateWarehouseOpened" @success="() => isCreateWarehouseOpened = false" />
  </CommandCenterModal>

  <CommandCenterModal :title="$t('center.update.warehouse')" :is-opened="isUpdateWarehouseOpened" @close="() => isUpdateWarehouseOpened = false">
    <FormUpdateWarehouse :warehouse-id="warehouseId" :is-opened="isUpdateWarehouseOpened" @success="() => isUpdateWarehouseOpened = false" />
  </CommandCenterModal>
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
    title: t('center.menu.warehouses'),
    href: '#',
  },
])

const warehouseId = ref('')
const isCreateWarehouseOpened = ref(false)
const isUpdateWarehouseOpened = ref(false)
</script>
