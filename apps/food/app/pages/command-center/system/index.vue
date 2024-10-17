<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <div class="mb-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
    <h1 class="text-2xl md:text-3xl font-semibold">
      {{ t('center.menu.settings') }}
    </h1>
  </div>
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
    title: t('center.menu.settings'),
    href: '#',
  },
])
</script>
