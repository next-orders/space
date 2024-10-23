<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['02-staff'],
})

const { t } = useI18n()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.dashboard'),
    href: '#',
  },
])
</script>
