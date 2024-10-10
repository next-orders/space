<template>
  <nav
    :data-active="isNavbarOpened"
    class="z-10 w-0 h-[calc(100dvh-64px)] invisible lg:visible lg:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:visible lg:data-[active=true]:w-72"
  >
    <div class="w-full h-full bg-neutral-50 dark:bg-neutral-700 px-2 md:px-4 pt-4 border-r border-neutral-100 dark:border-neutral-500">
      <div class="h-full overflow-y-auto flex flex-col justify-between">
        <slot />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isNavbarOpened } = useApp()
</script>
