<template>
  <UiBreadcrumb :links="breadcrumbs" />
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
    title: t('center.menu.checkouts'),
    href: '#',
  },
])
</script>
