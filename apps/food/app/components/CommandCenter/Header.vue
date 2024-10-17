<template>
  <div class="w-full h-full px-2 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-neutral-100 dark:border-neutral-500">
    <div class="mr-2 lg:hidden flex justify-center items-center justify-items-center h-full hover:scale-110 transition duration-200">
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

    <div class="mr-auto hidden">
      <div class="flex flex-row gap-2 items-center">
        <Icon :name="icons.search" class="w-8 h-8" />
        <input type="text" :placeholder="$t('center.search-label')" class="bg-transparent">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { isNavbarOpened } = useApp()
</script>
