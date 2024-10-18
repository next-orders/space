<template>
  <UiBreadcrumb :links="breadcrumbs" :is-dark-background="true" />

  <div class="space-y-12">
    <div>
      <div class="mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <h2 class="text-xl md:text-2xl font-semibold">
          {{ t('center.data.general-title') }}
        </h2>

        <UiButton class="w-full md:w-fit">
          {{ t('center.edit.title') }}
        </UiButton>
      </div>

      <div class="max-w-sm flex flex-col gap-2">
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('center.data.name') }}: <span class="font-semibold">{{ channel?.name }}</span>
        </div>
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('center.data.description') }}: <span class="font-semibold">{{ channel?.description }}</span>
        </div>
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('center.data.phone') }}: <span class="font-semibold">{{ channel?.phone }}</span>
        </div>
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('center.data.currency') }}: <span class="font-semibold">{{ channel?.currencyCode }}</span>
        </div>
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('center.data.country') }}: <span class="font-semibold">{{ channel?.countryCode }}</span>
        </div>
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('center.data.timezone') }}: <span class="font-semibold">{{ channel?.timeZone }}</span>
        </div>
        <div class="bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          {{ t('app.minimum-order-value') }}: <span class="font-semibold">{{ channel?.minAmountForDelivery }} {{ getCurrencySign(channel?.currencyCode) }}</span>
        </div>

        <div class="text-sm whitespace-pre-wrap max-w-sm bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          <p class="mb-2 text-base">
            {{ t('center.data.delivery-conditions') }}:
          </p>
          {{ channel?.conditions }}
        </div>
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-xl md:text-2xl font-semibold">
        {{ t('center.data.methods-orders-title') }}
      </h2>

      <div class="space-y-2 max-w-sm">
        <div class="w-full flex flex-row gap-3 justify-between items-center bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          <div class="flex flex-row gap-3">
            <UiSwitch :checked="channel?.isDeliveryAvailable" />
            <p class="font-medium min-w-28">
              {{ t('app.cart.delivery') }}
            </p>
          </div>
        </div>

        <div class="w-full flex flex-row gap-3 justify-between items-center bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          <div class="flex flex-row gap-3">
            <UiSwitch :checked="channel?.isPickupAvailable" />
            <p class="font-medium min-w-28">
              {{ t('app.cart.pickup') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <h2 class="text-xl md:text-2xl font-semibold">
          {{ t('center.data.online-ordering-time-title') }}
        </h2>

        <UiButton class="w-full md:w-fit">
          {{ t('center.edit.title') }}
        </UiButton>
      </div>

      <div class="space-y-2 max-w-sm">
        <div v-for="workingDay in channel?.workingDays" :key="workingDay.id" class="w-full flex flex-row gap-3 justify-between items-center bg-white dark:bg-neutral-500 rounded-2xl px-4 py-3">
          <div class="flex flex-row gap-3">
            <UiSwitch :checked="workingDay.isActive" />
            <p class="font-medium min-w-28">
              {{ getLocalizedDayOfWeek(workingDay.day as WorkingDay['day']) }}
            </p>
          </div>

          <div>
            {{ workingDay.openHours }}:{{ workingDay.openMinutes.toString().padStart(2, '0') }} - {{ workingDay.closeHours }}:{{ workingDay.closeMinutes.toString().padStart(2, '0') }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-xl md:text-2xl font-semibold">
        {{ t('center.data.payment-methods-title') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <CommandCenterPaymentMethodCard v-for="paymentMethod in channel?.paymentMethods" :key="paymentMethod.id" :payment-method-id="paymentMethod.id" />
        <CommandCenterPaymentMethodCreateCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'command-center',
  middleware: ['staff'],
})

const { t } = useI18n()
const { channel } = await useChannel()

const breadcrumbs = computed(() => [
  { title: t('common.website'), href: '/' },
  {
    title: t('center.menu.settings'),
    href: '#',
  },
])
</script>
