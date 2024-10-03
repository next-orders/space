<template>
  <div class="pb-6">
    <div class="px-4 py-4 flex flex-col lg:flex-row gap-2 items-center bg-white dark:bg-neutral-600 rounded-2xl text-orange-500">
      <Icon :name="icons.maintenance" class="w-12 h-12" />
      <p class="text-lg text-center md:text-left font-semibold">
        {{ $t('app.maintenance-message') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
