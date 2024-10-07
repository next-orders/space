<template>
  <ClientOnly>
    <div v-if="!isEmpty" class="block xl:hidden">
      <UiButton
        class="px-4 flex flex-row gap-2 items-center"
        @click="isCartDrawerOpened = !isCartDrawerOpened"
      >
        <p>{{ $t('app.cart.title') }}</p>
        <div class="rounded-full bg-white w-6 h-6 text-center">
          {{ checkout?.lines?.length }}
        </div>
      </UiButton>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const { isCartDrawerOpened } = useApp()
const { checkout, isEmpty } = useCheckout()
</script>
