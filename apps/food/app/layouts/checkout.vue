<template>
  <header class="z-10 h-16 bg-white dark:bg-neutral-600 fixed top-0 left-0 right-0">
    <CheckoutHeader />
  </header>

  <main class="relative top-16 bg-neutral-100 dark:bg-neutral-800">
    <div class="px-2 md:px-4 pb-10 mx-auto max-w-5xl">
      <slot />
    </div>
    <div class="mx-auto max-w-4xl">
      <Footer />
    </div>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale,
  },
})
</script>
