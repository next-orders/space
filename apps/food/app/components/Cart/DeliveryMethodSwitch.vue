<template>
  <ClientOnly>
    <div class="px-0 py-0 flex flex-row gap-0 justify-center bg-neutral-50 dark:bg-neutral-500 rounded-2xl">
      <UiButton
        v-if="channel?.isDeliveryAvailable"
        class="w-full px-2 py-2"
        :variant="checkout?.deliveryMethod === 'DELIVERY' ? 'default' : 'ghost'"
        @click="update({ deliveryMethod: 'DELIVERY' })"
      >
        {{ $t('app.cart.delivery') }}
      </UiButton>
      <UiButton
        v-if="channel?.isPickupAvailable"
        class="w-full px-2 py-2"
        :variant="checkout?.deliveryMethod === 'WAREHOUSE' ? 'default' : 'ghost'"
        @click="update({ deliveryMethod: 'WAREHOUSE' })"
      >
        {{ $t('app.cart.pickup') }}
      </UiButton>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const { channel } = await useChannel()
const { checkout, update } = useCheckout()
</script>
