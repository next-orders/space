<template>
  <UiBreadcrumb :links="breadcrumbs" />

  <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
    <CommandCenterClientCard id="123" first-name="John" />
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
    title: t('center.menu.clients'),
    href: '#',
  },
])
</script>
