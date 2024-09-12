<template>
  <Breadcrumbs :links="breadcrumbs" />

  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2">
    <CommandCenterMenuCard v-for="menu in dataChannel?.menus" :key="menu.id" :menu-id="menu.id" />

    <CommandCenterMenuCreateCard @click="isModalOpened = true" />
  </div>

  <div class="mt-24 text-center max-w-xl mx-auto">
    <img
      src="~/assets/img/eggs-192.png"
      width="64"
      height="64"
      alt=""
      class="mx-auto mb-4 w-16 h-16"
    >
    <h2 class="mb-4 text-lg font-semibold">
      Здесь происходит работа с меню
    </h2>
    <p class="text-left">
      Выберите созданное меню или создайте новое. Внутри меню можно добавлять новые категории и продукты.
    </p>
  </div>

  <CommandCenterModal :title="$t('center.create.menu')">
    <form>
      <input type="text" placeholder="name">
    </form>
  </CommandCenterModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { isModalOpened } = useCommandCenter()
const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.menu'),
    href: '#',
  },
])

const dataChannel = await useChannel()
</script>
