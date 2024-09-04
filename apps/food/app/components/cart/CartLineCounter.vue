<template>
  <div class="flex flex-row justify-between items-center bg-gray-100 w-20 min-w-[5.5rem] rounded-2xl px-1 py-2">
    <button
      aria-label="Minus"
      class="flex flex-row items-center px-1 py-1 rounded-xl lg:hover:scale-90 lg:hover:bg-gray-200 duration-200"
      @click="() => {}"
    >
      <Icon :name="icons.minus" class="w-5 h-5" />
    </button>

    <div class="text-base">
      {{ count }}
    </div>

    <button
      aria-label="Plus"
      class="flex flex-row items-center px-1 py-1 rounded-xl lg:hover:scale-90 lg:hover:bg-gray-200 duration-200"
      @click="() => {}"
    >
      <Icon :name="icons.plus" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const count = 1
</script>
