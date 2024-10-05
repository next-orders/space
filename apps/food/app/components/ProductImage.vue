<template>
  <picture v-if="id">
    <source type="image/webp" :sizes="sizes" :srcset="srcset">
    <img alt="" :loading="lazy ? 'lazy' : 'eager'" class="rounded-xl w-full" :src="`/api/file/${id}/300.jpg`" :sizes="sizes" :srcset="srcset">
  </picture>

  <img v-else alt="" class="w-full opacity-20" src="~/assets/img/no-image.png">
</template>

<script setup lang="ts">
const { id, lazy = true } = defineProps<{
  id?: string | null
  lazy?: boolean
}>()

const sizes = '(max-width: 300px) 120px, (max-width: 768px) 300px, (max-width: 1024px) 600px, 800px'
const srcset = computed(() => `/api/file/${id}/120.webp 120w, /api/file/${id}/300.webp 300w, /api/file/${id}/600.webp 600w, /api/file/${id}/800.webp 800w`)
</script>
