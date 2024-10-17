<template>
  <div class="absolute -top-2 -right-2 w-7 h-7 bg-neutral-100 dark:bg-neutral-500 rounded-full">
    <Icon :name="icons.circleCheck" class="w-7 h-7 text-emerald-500" />
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
