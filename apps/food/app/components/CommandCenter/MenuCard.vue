<template>
  <NuxtLink :to="`/command-center/menu/${menuId}`">
    <UiActiveCard class="py-6 relative min-h-60 text-center flex flex-col items-center justify-center">
      <Icon v-if="menu?.isActive" :name="icons.monitorCheck" class="w-8 h-8 text-emerald-500 opacity-100 absolute top-3 left-3" />

      <Icon :name="icons.book" class="w-12 h-12 mb-2 text-neutral-300 dark:text-neutral-500" />

      <h3 class="text-xl font-semibold">
        {{ menu?.name }}
      </h3>

      <ul>
        <li v-for="category in menu?.categories" :key="category.id">
          {{ category.name }} ({{ category.products?.length }})
        </li>
      </ul>
    </UiActiveCard>
  </NuxtLink>
</template>

<script setup lang="ts">
const { menuId } = defineProps<{
  menuId: string
}>()

const { icons } = useAppConfig()
const { menus } = await useChannel()
const menu = computed(() => menus.value?.find((menu) => menu.id === menuId))
</script>
