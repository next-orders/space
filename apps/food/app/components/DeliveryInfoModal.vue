<template>
  <UiModal :title="checkout?.deliveryMethod === 'DELIVERY' ? $t('app.cart.delivery-details') : $t('app.cart.pickup-details')" :is-opened="isDeliveryInfoModalOpened" @close="isDeliveryInfoModalOpened = false">
    <div class="font-sans whitespace-pre-wrap">
      {{ channel?.conditions }}
    </div>

    <div class="mt-8 mb-2 text-xl font-medium">
      {{ $t('common.more-information') }}
    </div>

    <div v-if="channel?.minAmountForDelivery" class="mb-2 flex flex-row justify-between">
      <div>{{ $t('app.minimum-order-value') }}</div>
      <div>
        {{ channel?.minAmountForDelivery }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
      </div>
    </div>

    <UiButton variant="secondary" class="mt-4" @click="isDeliveryInfoModalOpened = false">
      {{ $t('common.ok') }}
    </UiButton>
  </UiModal>
</template>

<script setup lang="ts">
const { isDeliveryInfoModalOpened } = useApp()
const { channel } = await useChannel()
const { checkout } = useCheckout()
</script>
