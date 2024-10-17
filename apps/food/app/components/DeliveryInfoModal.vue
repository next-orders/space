<template>
  <button
    class="z-40 fixed left-0 right-0 -top-20 -bottom-20 appearance-none bg-neutral-700/50 dark:bg-neutral-900/50 opacity-0 data-[active=true]:opacity-100 translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
    :data-active="isDeliveryInfoModalOpened"
    @click="isDeliveryInfoModalOpened = false"
  />
  <div
    class="z-40 fixed left-0 top-0 w-full max-w-md h-auto p-2 m-0 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
    :data-active="isDeliveryInfoModalOpened"
  >
    <div class="mt-16 px-8 py-8 bg-white dark:bg-neutral-600 rounded-2xl">
      <div class="mb-2 text-2xl font-medium">
        {{ checkout?.deliveryMethod === 'DELIVERY' ? $t('app.cart.delivery-details') : $t('app.cart.pickup-details') }}
      </div>

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
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDeliveryInfoModalOpened } = useApp()
const { channel } = await useChannel()
const { checkout } = useCheckout()
</script>
