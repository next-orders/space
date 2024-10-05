<template>
  <div v-if="checkout" class="relative bg-white dark:bg-neutral-600 rounded-2xl px-4 py-4 h-full flex flex-col justify-between">
    <div class="h-screen overflow-y-auto">
      <div class="mb-48">
        <div class="mb-4 flex flex-row justify-between items-center">
          <p class="text-2xl font-medium">
            {{ $t('app.cart.title') }}
          </p>

          <button
            aria-label="Close"
            class="block xl:hidden rounded-xl lg:hover:scale-90 hover:bg-neutral-100 duration-200"
            @click="isCartDrawerOpened = !isCartDrawerOpened"
          >
            <Icon :name="icons.close" class="w-8 h-8" />
          </button>
        </div>

        <div class="mt-2 mb-4">
          <CartDeliveryMethodSwitch />
        </div>

        <CartEmpty v-if="isEmpty" />
        <div v-else>
          <CartLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" />
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 rounded-2xl bg-neutral-50 dark:bg-neutral-700">
      <button
        class="relative my-4 mx-4 flex flex-row gap-3 flex-wrap items-center active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200"
        @click="isDeliveryInfoModalOpened = !isDeliveryInfoModalOpened"
      >
        <Icon :name="icons.info" class="w-8 h-8 text-neutral-300" />

        <div class="text-left">
          <CartDeliveryInfo />

          <div class="text-sm text-neutral-500">
            {{ $t('app.cart.conditions') }}
          </div>
        </div>
      </button>

      <div v-if="!isEmpty" class="my-4 mx-4">
        <NuxtLink to="/checkout">
          <UiButton class="py-4 flex flex-row gap-2 flex-wrap justify-between items-center">
            <p>{{ $t('app.cart.next-label') }}</p>
            <div class="text-lg tracking-tight">
              {{ getLocalizedPrice(checkout?.totalPrice) }} <span class="text-base">{{ getCurrencySign(channel?.currencyCode) }}</span>
            </div>
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isCartDrawerOpened, isDeliveryInfoModalOpened } = useApp()
const { icons } = useAppConfig()
const { channel } = await useChannel()
const { checkout, isEmpty } = await useCheckout()
</script>
