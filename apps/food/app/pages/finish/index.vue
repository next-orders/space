<template>
  <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium text-center">
    {{ $t('app.finish.title') }}
  </h1>

  <div class="p-3 md:p-6 bg-white dark:bg-neutral-600 rounded-3xl space-y-6">
    <h2 class="text-center font-medium text-xl">
      {{ $t('app.finish.success-message') }} {{ $t('app.finish.expect-call') }}
    </h2>

    <ClientOnly>
      <div>
        <h3 class="mb-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
          {{ checkout?.deliveryMethod === 'WAREHOUSE' ? $t('app.cart.pickup') : $t('app.cart.delivery') }}
        </h3>

        <p>{{ $t('app.checkout.your-name') }}: {{ checkout?.name }}</p>
        <p>{{ $t('app.checkout.your-phone') }}: {{ checkout?.phone }}</p>

        <p>
          {{ $t('app.checkout.address.title') }}:
          <span v-if="warehouse?.address">{{ warehouse?.address }}</span>
          <span v-if="address">{{ address }}</span>
        </p>

        <p>{{ $t('app.checkout.payment-title') }}: {{ channel?.paymentMethods.find((p) => p.id === checkout?.paymentMethodId)?.name }}</p>
        <p>{{ $t('app.checkout.order-note') }}: {{ checkout?.note }}</p>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
          {{ $t('app.finish.ordered-title') }}
        </h3>

        <CheckoutLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" :can-be-changed="false" />
      </div>

      <div>
        <h3 class="mb-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
          {{ $t('app.checkout.total-title') }}
        </h3>
        <div class="flex flex-row justify-between">
          <div>{{ $t('app.checkout.cost.products') }}</div>
          <div class="tracking-tight text-lg">
            {{ checkout?.totalPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div>{{ $t('app.checkout.cost.delivery') }}</div>
          <div class="tracking-tight text-lg">
            {{ checkout?.shippingPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>
        </div>
      </div>
    </ClientOnly>

    <NuxtLink to="/" class="block grow">
      <UiButton class="w-full px-4 py-4 text-lg text-center">
        {{ $t('common.to-home') }}
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'finish',
})

const { channel } = await useChannel()
const { checkout, address } = useCheckout()

const warehouse = computed(() => channel.value?.warehouses.find((w) => w.id === checkout.value?.warehouseId))
</script>
