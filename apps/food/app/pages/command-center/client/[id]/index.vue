<template>
  <UiBreadcrumb :links="breadcrumbs" />

  Client page
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.clients'),
    href: '/command-center/client',
  },
  {
    title: t('center.menu.client-page'),
    href: '#',
  },
])
</script>
