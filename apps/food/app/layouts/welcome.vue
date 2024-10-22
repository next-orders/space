<template>
  <main class="relative w-full max-w-lg mx-auto bg-neutral-100 dark:bg-neutral-800">
    <NuxtErrorBoundary>
      <slot />
    </NuxtErrorBoundary>

    <Footer />
  </main>
</template>
