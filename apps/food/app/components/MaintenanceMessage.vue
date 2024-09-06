<template>
  <div class="px-4 pt-4 pb-6">
    <div class="px-4 py-4 flex flex-col lg:flex-row gap-2 items-center bg-white rounded-2xl text-orange-600">
      <Icon :name="icons.maintenance" class="w-12 h-12" />
      <p class="text-lg text-center md:text-left font-semibold">
        Веб-сайт находится на техническом обслуживании. Заказы приостановлены.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
