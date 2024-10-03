<template>
  <Header />
  <NavigationMain />

  <main class="relative w-auto bg-neutral-100 dark:bg-neutral-800 lg:pl-72 xl:pr-80 top-16">
    <CommandCenterStaffBar v-if="user?.isStaff" />

    <div class="px-4 pb-10 pt-4">
      <NuxtErrorBoundary>
        <slot />
      </NuxtErrorBoundary>
    </div>

    <DeliveryInfoModal />
    <CartDrawer />
    <Footer />
  </main>

  <aside class="hidden w-0 xl:block xl:w-80 fixed right-0 bottom-0 top-16">
    <div class="pr-4 py-4 h-full ">
      <Cart />
    </div>
  </aside>
</template>

<script setup lang="ts">
const { user } = useUserSession()
</script>
