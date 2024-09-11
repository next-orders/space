<template>
  <NuxtLink :to="`/command-center/client/${id}`">
    <div class="bg-zinc-50 rounded-2xl h-auto w-auto p-3 cursor-pointer hover:scale-95 duration-200 group">
      <div class="relative">
        <img
          :src="clientAvatarURL"
          alt="Client"
          width="300"
          height="300"
          class="w-full aspect-square rounded-xl"
        >
      </div>

      <div class="mt-2 text-base font-medium leading-tight text-center">
        {{ firstName }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  firstName: string
}>()

const clientAvatarURL = '/api/avatar/123.svg'
</script>
