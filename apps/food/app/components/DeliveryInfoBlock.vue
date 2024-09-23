<template>
  <p class="font-medium text-lg mb-2">
    {{ title }}
  </p>
  <div class="flex flex-row gap-2 items-center mb-2">
    <Icon :name="icons.clock" /> {{ $t('app.cart.today-until') }} {{ todayUntil }}
  </div>
  <div class="mb-2">
    <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'" class="flex flex-row gap-2 items-center">
      <Icon :name="icons.discount" />
      <div class="lowercase">
        {{ $t('app.cart.discount') }} {{ discount }} <span class="text-sm">%</span>
      </div>
    </div>

    <div v-if="checkout?.deliveryMethod === 'DELIVERY'" class="flex flex-row gap-2 items-center">
      <Icon :name="icons.delivery" />
      <div class="lowercase">
        {{ $t('app.cart.free-from') }} {{ freeFrom }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode as CurrencyCode) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { t } = useI18n()
const { channel } = await useChannel()
const { checkout } = await useCheckout()

const title = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' ? t('app.cart.delivery') : t('app.cart.pickup'))
const todayUntil = computed(() => checkout.value?.deliveryMethod === 'DELIVERY' ? '22:00' : '23:00')

const discount = 10
const freeFrom = 2500
</script>
