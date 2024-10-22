<template>
  <header class="z-20 h-16 bg-white dark:bg-neutral-600 fixed top-0 left-0 right-0">
    <div class="z-10 w-full h-full px-2 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-neutral-100 dark:border-neutral-500">
      <div class="mr-2 md:mr-0 flex justify-center items-center justify-items-center lg:hidden h-full lg:hover:scale-110 transition duration-200">
        <button
          aria-label="Close Navigation"
          :data-active="isNavbarOpened"
          class="hidden data-[active=true]:flex items-center"
          @click="isNavbarOpened = !isNavbarOpened"
        >
          <Icon :name="icons.close" class="w-10 h-10" />
        </button>
        <button
          aria-label="Open Navigation"
          :data-active="!isNavbarOpened"
          class="hidden data-[active=true]:flex items-center"
          @click="isNavbarOpened = !isNavbarOpened"
        >
          <Icon :name="icons.menu" class="w-10 h-10" />
        </button>
      </div>

      <div class="relative mr-auto group">
        <div class="flex flex-row gap-1 items-center">
          <Icon :name="icons.search" class="w-8 h-8" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('app.search.placeholder')"
            class="px-2 py-2 w-32 md:w-56 bg-transparent group-focus:bg-neutral-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 outline-none rounded-xl"
          >
        </div>

        <SearchBlock />
      </div>

      <CartButton />
    </div>
  </header>
</template>

<script setup lang="ts">
const { isNavbarOpened, searchQuery } = useApp()
const { icons } = useAppConfig()
</script>
