<template>
  <NuxtLink to="https://github.com/next-orders/food" target="_blank">
    <UButton
      :icon="icons.github"
      aria-label="GitHub"
      variant="ghost"
      color="gray"
      size="xl"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
</script>
