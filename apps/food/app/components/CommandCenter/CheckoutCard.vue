<template>
  <UiActiveCard class="px-4 md:px-6 py-5 space-y-8">
    <div>
      <h3 class="mb-2 text-lg font-semibold">
        {{ checkout?.deliveryMethod === 'WAREHOUSE' ? $t('app.cart.pickup') : $t('app.cart.delivery') }}
      </h3>

      <p class="font-medium">
        <span class="text-neutral-500 font-normal">{{ $t('center.checkout.name') }}:</span> {{ checkout?.name }}
      </p>
      <p class="font-medium mb-2">
        <span class="text-neutral-500 font-normal">{{ $t('center.checkout.phone') }}:</span> {{ checkout?.phone }}
      </p>

      <p v-if="checkout?.time" class="font-medium">
        <span class="text-neutral-500 font-normal">{{ $t('app.checkout.time-title') }}:</span> {{ checkout?.timeType === 'ASAP' ? $t('app.checkout.as-soon-as-possible') : new Date(checkout?.time).toLocaleString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }) }}
      </p>

      <p class="font-medium">
        <span class="text-neutral-500 font-normal pr-1">{{ $t('app.checkout.address.title') }}:</span>
        <span v-if="warehouse?.address">{{ warehouse?.address }}</span>
        <span v-if="address">{{ address }}</span>
      </p>

      <p class="font-medium">
        <span class="text-neutral-500 font-normal">{{ $t('app.checkout.payment-title') }}:</span> {{ channel?.paymentMethods.find((p) => p.id === checkout?.paymentMethodId)?.name }}
      </p>
      <p v-if="checkout?.change" class="font-medium">
        <span class="text-neutral-500 font-normal">{{ $t('app.checkout.change-label') }}:</span> {{ checkout?.change }} {{ getCurrencySign(channel?.currencyCode) }}
      </p>
      <p class="font-medium">
        <span class="text-neutral-500 font-normal">{{ $t('app.checkout.order-note') }}:</span> {{ checkout?.note }}
      </p>
    </div>

    <div>
      <CommandCenterCheckoutLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" />
    </div>

    <div>
      <div class="flex flex-row justify-between">
        <div class="text-neutral-500">
          {{ $t('app.checkout.cost.products') }}
        </div>
        <div class="tracking-tight text-lg">
          {{ checkout?.totalPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div class="text-neutral-500">
          {{ $t('app.checkout.cost.delivery') }}
        </div>
        <div class="tracking-tight text-lg">
          {{ checkout?.shippingPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
        </div>
      </div>
    </div>
  </UiActiveCard>
</template>

<script setup lang="ts">
const { id } = defineProps<{
  id: string
}>()

const { t } = useI18n()
const { channel } = await useChannel()
const { getAddress } = useCheckout()
const { checkouts } = await useCheckoutList()
const checkout = computed(() => checkouts.value?.find((c) => c.id === id))

const warehouse = computed(() => channel.value?.warehouses.find((w) => w.id === checkout.value?.warehouseId))
const addressResponse = checkout.value?.addressId && await getAddress(checkout.value?.addressId)
const address = computed(() => addressResponse && `${addressResponse.street} ${addressResponse.flat}, ${t('app.checkout.address.doorphone')} ${addressResponse.doorphone}, ${t('app.checkout.address.entrance')} ${addressResponse.entrance}, ${t('app.checkout.address.floor')} ${addressResponse.floor}. ${addressResponse.note}`)
</script>
