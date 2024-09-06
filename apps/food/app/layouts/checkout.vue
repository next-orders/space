<template>
  <header class="z-10 h-16 bg-white fixed top-0 left-0 right-0">
    <CheckoutHeader />
  </header>

  <main class="relative top-16 bg-gray-100">
    <div class="px-2 md:px-4 pb-10 mx-auto max-w-5xl">
      <slot />
    </div>
    <div class="mx-auto max-w-4xl">
      <Footer />
    </div>
  </main>
</template>
