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

        <p>{{ $t('app.checkout.your-name') }}: <span class="font-medium">{{ checkout?.name }}</span></p>
        <p class="mb-2">
          {{ $t('app.checkout.your-phone') }}: <span class="font-medium">{{ checkout?.phone }}</span>
        </p>

        <p v-if="checkout?.time">
          {{ $t('app.checkout.time-title') }}: <span class="font-medium">{{ checkout?.timeType === 'ASAP' ? $t('app.checkout.as-soon-as-possible') : new Date(checkout?.time).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }) }}</span>
        </p>
        <div>
          {{ $t('app.checkout.address.title') }}:
          <p v-if="warehouse?.address" class="inline font-medium">
            {{ warehouse?.address }}
          </p>
          <p v-if="checkout?.street" class="inline font-medium">
            <span>{{ checkout?.street }} {{ checkout?.flat }}</span>
            <span v-if="checkout?.doorphone" class="lowercase">, {{ $t('app.checkout.address.doorphone') }} {{ checkout?.doorphone }}</span>
            <span v-if="checkout?.entrance" class="lowercase">, {{ $t('app.checkout.address.entrance') }} {{ checkout?.entrance }}</span>
            <span v-if="checkout?.floor" class="lowercase">, {{ $t('app.checkout.address.floor') }} {{ checkout?.floor }}</span>
            <span v-if="checkout?.addressNote">. {{ checkout?.addressNote }}</span>
          </p>
        </div>

        <p>{{ $t('app.checkout.payment-title') }}: <span class="font-medium">{{ channel?.paymentMethods.find((p) => p.id === checkout?.paymentMethodId)?.name }}</span></p>
        <p v-if="checkout?.change">
          {{ $t('app.checkout.change-label') }}: <span class="font-medium">{{ checkout?.change }} {{ getCurrencySign(channel?.currencyCode) }}</span>
        </p>
        <p v-if="checkout?.note">
          {{ $t('app.checkout.order-note') }}: <span class="font-medium">{{ checkout?.note }}</span>
        </p>
      </div>

      <div>
        <h3 class="mb-2 text-lg font-medium text-neutral-500 dark:text-neutral-400">
          {{ $t('app.finish.ordered-title') }}
        </h3>

        <CheckoutLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" :line="line" :can-be-changed="false" />
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

const route = useRoute()
const id = ref(route.query.id ? route.query.id.toString() : '')
if (!id.value) {
  navigateTo('/')
}

const { data: checkout, error } = await useFetch(`/api/checkout/id/${id.value}`)
if (error.value) {
  navigateTo('/')
}

const warehouse = computed(() => channel.value?.warehouses.find((w) => w.id === checkout.value?.warehouseId))
</script>
