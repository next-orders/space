<template>
  <picture v-if="id">
    <source type="image/webp" :sizes="sizes" :srcset="srcsetWebp">
    <img alt="" :loading="lazy ? 'lazy' : 'eager'" class="rounded-xl w-full" :src="`/api/file/${id}/${sizePx}.jpg`" :sizes="sizes" :srcset="srcset">
  </picture>

  <img v-else alt="" class="w-full opacity-20" src="~/assets/img/no-image.png">
</template>

<script setup lang="ts">
const { id, lazy = true, size = 'sm' } = defineProps<{
  id?: string | null
  lazy?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
}>()

const sizesMap = {
  xs: '120',
  sm: '300',
  md: '600',
  lg: '800',
}

const sizePx = sizesMap[size]
const sizes = `${sizePx}px`

const srcset = computed(() => `/api/file/${id}/${sizePx}.jpg ${sizePx}w`)
const srcsetWebp = computed(() => `/api/file/${id}/${sizePx}.webp ${sizePx}w`)
</script>
