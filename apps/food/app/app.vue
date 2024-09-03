<template>
  <div class="bg-white md:bg-gray-100 dark:bg-gray-800 min-h-dvh">
    <Header />
    <Navigation />

    <main class="relative w-auto bg-gray-100 md:pl-72 xl:pr-80 top-16">
      <div class="px-4 pb-10 pt-4">
        <NuxtPage />
      </div>

      <!-- {channel && checkout && (
      <DeliveryInfoModal
        checkout="{checkout}"
        channel="{channel}"
        locale="{locale}"
      />
      )} -->

      <!-- <CartDrawer channel="{channel}" checkout="{checkout}" /> -->
      <Footer />
    </main>
  </div>
</template>
