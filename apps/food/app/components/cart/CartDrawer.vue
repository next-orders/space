<template>
  <button
    class="z-30 fixed left-0 right-0 -top-20 -bottom-20 appearance-none bg-gray-700/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
    :data-active="isCartDrawerOpened"
    @click="isCartDrawerOpened = !isCartDrawerOpened"
  />
  <div
    class="z-30 fixed right-0 top-0 w-full max-w-sm ml-auto h-[100dvh] p-2 m-0 shadow-none rounded-2xl translate-x-full data-[active=true]:-translate-x-0 transition-transform"
    :data-active="isCartDrawerOpened"
  >
    <Cart />
  </div>
</template>

<script setup lang="ts">
const { isCartDrawerOpened } = useApp()
</script>
