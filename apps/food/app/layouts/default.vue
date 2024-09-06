<template>
  <Header />
  <Navigation />

  <main class="relative w-auto bg-gray-100 md:pl-72 xl:pr-80 top-16">
    <MaintenanceMessage v-if="channelData?.channel?.isActive === false" />
    <div class="px-4 pb-10 pt-4">
      <slot />
    </div>

    <DeliveryInfoModal />
    <CartDrawer />
    <Footer />
  </main>

  <aside class="hidden w-0 xl:block xl:w-80 fixed right-0 bottom-0 top-16">
    <div class="pr-4 py-4 h-full bg-gray-100">
      <Cart />
    </div>
  </aside>
</template>

<script setup lang="ts">
const channelData = await useChannel()
</script>
