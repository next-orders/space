<template>
  <Breadcrumbs :links="breadcrumbs" />

  Product Page

  {{ params.id }}
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { params } = useRoute()
const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.product-page'),
    href: '#',
  },
])
</script>
