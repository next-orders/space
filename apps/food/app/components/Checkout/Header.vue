<template>
  <div class="z-10 w-full h-full px-4 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-neutral-100 dark:border-neutral-500">
    <NuxtLink
      to="/"
      class="mr-2 md:mr-0 flex flex-row gap-2 items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
    >
      <Icon :name="icons.undo" size="20" /> {{ $t('common.return') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
