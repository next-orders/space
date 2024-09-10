<template>
  <div class="w-full h-full px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-gray-100 dark:border-gray-500">
    <div class="mr-2 2xl:hidden flex justify-center items-center justify-items-center h-full hover:scale-110 transition duration-200">
      <button
        aria-label="Close Navigation"
        :data-active="isNavbarOpened"
        class="hidden data-[active=true]:flex items-center"
        @click="isNavbarOpened = false"
      >
        <Icon :name="icons.close" class="w-10 h-10" />
      </button>
      <button
        aria-label="Open Navigation"
        :data-active="!isNavbarOpened"
        class="hidden data-[active=true]:flex items-center"
        @click="isNavbarOpened = true"
      >
        <Icon :name="icons.menu" class="w-10 h-10" />
      </button>
    </div>

    <div class="mr-auto">
      <div class="flex flex-row gap-2 items-center">
        <Icon :name="icons.search" class="w-8 h-8" />
        <input type="text" :placeholder="$t('center.search-label')" class="bg-transparent">
      </div>
    </div>

    <div class="hidden md:flex flex-row gap-4 items-center">
      <NuxtLink
        to="/"
        class="px-5 py-3 w-full flex flex-row gap-2 justify-center items-center text-base font-normal cursor-pointer rounded-2xl bg-gray-200 dark:bg-gray-500 active:scale-95 hover:bg-gray-300 lg:hover:scale-95 lg:active:scale-90 duration-200"
      >
        <Icon :name="icons.undo" size="20" /> {{ $t('center.to-website') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { isNavbarOpened } = useCommandCenter()
</script>
