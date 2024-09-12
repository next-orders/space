<template>
  <NuxtLink :to="`/command-center/menu/${menuId}`">
    <div class="bg-gray-50 rounded-2xl h-auto w-auto px-4 py-2 cursor-pointer hover:scale-95 duration-200 group">
      <h3 class="text-lg font-semibold">
        {{ menu?.name }}
      </h3>

      <ul>
        <li v-for="category in menu?.categories" :key="category.id">
          {{ category.name }} ({{ category.products?.length }})
        </li>
      </ul>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { menuId } = defineProps<{
  menuId: string
}>()

const dataChannel = await useChannel()

const menu = computed(() => dataChannel.value?.menus?.find((menu) => menu.id === menuId))
</script>
