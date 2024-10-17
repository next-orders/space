<template>
  <p class="font-medium text-lg mb-2 text-neutral-500 dark:text-neutral-400">
    {{ title }}
  </p>
  <div class="flex flex-row gap-2 items-center mb-2">
    <Icon :name="icons.clock" /> {{ $t('app.cart.today-until') }} {{ todayUntil }}
  </div>
  <div class="mb-2">
    <div v-if="checkout?.deliveryMethod === 'DELIVERY' && channel?.minAmountForDelivery" class="flex flex-row gap-2 items-center">
      <Icon :name="icons.delivery" />
      <div class="lowercase">
        {{ $t('app.cart.from') }} {{ channel?.minAmountForDelivery }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { t } = useI18n()

const { channel } = await useChannel()
const { checkout } = useCheckout()
const title = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' ? t('app.cart.delivery') : t('app.cart.pickup'))
const todayUntil = computed(() => channel.value?.workingDay?.isActive ? `${channel.value.workingDay.closeHours}:${channel.value.workingDay.closeMinutes.toString().padStart(2, '0')}` : undefined)
</script>
