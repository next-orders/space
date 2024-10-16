<template>
  <h1 class="pt-8 mb-4 md:mb-8 text-3xl md:text-4xl font-medium">
    {{ $t('app.checkout.title') }}
  </h1>

  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
    <div class="col-span-full md:col-span-7 space-y-6">
      <div class="p-3 md:p-6 bg-white dark:bg-neutral-600 rounded-3xl space-y-5">
        <CartDeliveryMethodSwitch />

        <div class="w-full">
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            {{ $t('app.checkout.contacts') }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <UiInput
              v-model="remainingCheckout.phone"
              type="tel"
              name="phone"
              :placeholder="$t('app.checkout.your-phone')"
              maxlength="17"
              :class="{ '!outline-emerald-500': isValidPhone }"
              @change="formatPhone"
            />

            <UiInput
              v-model="remainingCheckout.name"
              name="name"
              :placeholder="$t('app.checkout.your-name')"
            />
          </div>
        </div>

        <div v-if="checkout?.deliveryMethod === 'DELIVERY'" class="w-full">
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            {{ $t('app.checkout.enter-address') }}
          </h3>
          <UiLabel for="street">
            {{ $t('app.checkout.address.street') }}
          </UiLabel>
          <UiInput
            id="street"
            v-model="remainingCheckout.street"
            name="street"
          />

          <div class="mt-2 mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <UiLabel for="flat">
                {{ $t('app.checkout.address.flat') }}
              </UiLabel>
              <UiInput
                id="flat"
                v-model="remainingCheckout.flat"
                name="flat"
              />
            </div>

            <div>
              <UiLabel for="doorphone">
                {{ $t('app.checkout.address.doorphone') }}
              </UiLabel>
              <UiInput
                id="doorphone"
                v-model="remainingCheckout.doorphone"
                name="doorphone"
              />
            </div>

            <div>
              <UiLabel for="entrance">
                {{ $t('app.checkout.address.entrance') }}
              </UiLabel>
              <UiInput
                id="entrance"
                v-model="remainingCheckout.entrance"
                name="entrance"
              />
            </div>

            <div>
              <UiLabel for="floor">
                {{ $t('app.checkout.address.floor') }}
              </UiLabel>
              <UiInput
                id="floor"
                v-model="remainingCheckout.floor"
                name="floor"
              />
            </div>
          </div>

          <div>
            <UiLabel for="address-note">
              {{ $t('app.checkout.address.note') }}
            </UiLabel>
            <UiTextarea
              id="address-note"
              v-model="remainingCheckout.addressNote"
              name="address-note"
              :placeholder="$t('app.checkout.address.note-placeholder')"
            />
          </div>
        </div>
        <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'">
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            {{ $t('app.checkout.select-address') }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-1 gap-2">
            <UiButton v-for="warehouse in channel?.warehouses" :key="warehouse.id" variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="remainingCheckout.warehouseId = warehouse.id">
              <Icon :name="warehouse.id === remainingCheckout.warehouseId ? icons.mapPinCheck : icons.mapPinWarehouse" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': warehouse.id === remainingCheckout.warehouseId }" />
              <p class="font-medium leading-tight break-all">
                {{ warehouse.address }}
              </p>
            </UiButton>
          </div>
        </div>

        <div class="w-full">
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            {{ $t('app.checkout.time-title') }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <UiButton variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="() => { remainingCheckout.timeType = 'ASAP'; selectedTimeLabel = '' }">
              <Icon :name="remainingCheckout.timeType === 'ASAP' ? icons.clockCheck : icons.clock" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': remainingCheckout.timeType === 'ASAP' }" />
              <p class="font-medium leading-tight break-all">
                {{ $t('app.checkout.as-soon-as-possible') }}
              </p>
            </UiButton>

            <UiButton variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="isSelectTimeModalOpened = true">
              <Icon :name="remainingCheckout.timeType === 'SCHEDULED' ? icons.alarmClockCheck : icons.alarmClock" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': remainingCheckout.timeType === 'SCHEDULED' }" />
              <p class="font-medium leading-tight break-all">
                {{ selectedTimeLabel || $t('app.checkout.on-time') }}
              </p>
            </UiButton>
          </div>
        </div>
      </div>

      <div class="p-3 md:p-6 bg-white dark:bg-neutral-600 rounded-3xl">
        <h2 class="mb-4 text-xl md:text-2xl font-medium">
          {{ $t('app.checkout.order-title') }}
        </h2>

        <CheckoutLine v-for="line in checkout?.lines" :key="line.id" :line-id="line.id" />

        <div class="mt-4">
          <UiLabel for="note">
            {{ $t('app.checkout.order-note') }}
          </UiLabel>
          <UiTextarea
            id="note"
            v-model="remainingCheckout.note"
            name="note"
            :placeholder="$t('app.checkout.order-note-placeholder')"
          />
        </div>
      </div>
    </div>

    <div class="col-span-full md:col-span-5 h-fit sticky top-20">
      <div class="mb-6 p-3 md:p-6 bg-white dark:bg-neutral-600 rounded-3xl space-y-5">
        <div>
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            {{ $t('app.checkout.payment-title') }}
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-2 gap-2">
            <UiButton v-for="method in paymentMethods" :key="method.type" variant="secondary" class="w-full min-h-14 flex flex-col flex-wrap gap-1 justify-center items-center" @click="remainingCheckout.paymentMethodId = method.id">
              <Icon :name="method.type === 'CASH' ? icons.moneyCash : icons.moneyCard" class="w-8 h-8 text-neutral-300" :class="{ '!text-emerald-500': method.id === remainingCheckout.paymentMethodId }" />
              <p class="font-medium leading-tight break-all">
                {{ method.name }}
              </p>
            </UiButton>
          </div>

          <div v-if="selectedPaymentMethod?.type === 'CASH'" class="mt-4">
            <UiLabel for="change">
              {{ $t('app.checkout.change-label') }}?
            </UiLabel>
            <UiInput
              id="change"
              v-model="remainingCheckout.change"
              name="change"
              :placeholder="getCurrencySign(channel?.currencyCode)"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-2 text-lg md:text-xl font-medium">
            {{ $t('app.checkout.total-title') }}
          </h3>

          <div>
            <div class="mb-2 flex flex-row justify-between text-lg">
              <div>{{ $t('app.checkout.cost.products') }}</div>
              <div class="tracking-tight">
                {{ checkout?.totalPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
              </div>
            </div>
            <div class="mb-2 flex flex-row justify-between text-lg">
              <div>{{ $t('app.checkout.cost.delivery') }}</div>
              <div class="tracking-tight">
                {{ checkout?.shippingPrice }} <span class="text-sm">{{ getCurrencySign(channel?.currencyCode) }}</span>
              </div>
            </div>

            <!-- <div class="mt-4">
              <div class="text-base text-neutral-500">
                Есть промо код?
              </div>
            </div> -->
          </div>
        </div>

        <div class="flex flex-row flex-nowrap gap-4 items-center">
          <UiButton class="grow w-full px-4 py-4 text-lg text-center" @click="updateCheckout">
            {{ $t('app.checkout.create-order') }}
          </UiButton>

          <div class="font-medium text-right text-2xl min-w-[5rem] tracking-tight">
            {{ totalPrice }} <span class="text-base">{{ getCurrencySign(channel?.currencyCode) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CommandCenterModal :title="$t('app.checkout.select-time-title')" :is-opened="isSelectTimeModalOpened" @close="() => isSelectTimeModalOpened = false">
    <div class="flex flex-col gap-2">
      <UiButton variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="() => { remainingCheckout.timeType = 'ASAP'; selectedTimeLabel = ''; isSelectTimeModalOpened = false }">
        <Icon :name="remainingCheckout.timeType === 'ASAP' ? icons.clockCheck : icons.clock" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': remainingCheckout.timeType === 'ASAP' }" />
        <p class="font-medium leading-tight break-all">
          {{ $t('app.checkout.as-soon-as-possible') }}
        </p>
      </UiButton>

      <UiButton v-for="slot in slots" :key="slot.id" variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="() => { remainingCheckout.timeType = 'SCHEDULED'; remainingCheckout.time = new Date(slot.value); selectedTimeLabel = slot.label; isSelectTimeModalOpened = false }">
        <Icon :name="remainingCheckout.timeType === 'SCHEDULED' ? icons.alarmClockCheck : icons.alarmClock" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': remainingCheckout.timeType === 'SCHEDULED' && remainingCheckout.time?.getTime() === slot.value }" />
        <p class="font-medium leading-tight break-all">
          {{ slot.label }}
        </p>
      </UiButton>
    </div>
  </CommandCenterModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'checkout',
})

const { icons } = useAppConfig()
const { channel } = await useChannel()
const { checkout, update } = useCheckout()
const { slots } = useTime()

const countryCode = computed(() => channel.value?.countryCode as CountryCode)
const paymentMethods = computed(() => channel.value?.paymentMethods)

const remainingCheckout = reactive<CheckoutDraft>({
  name: '',
  phone: '',
  time: undefined,
  timeType: 'ASAP',
  change: undefined,
  note: undefined,
  warehouseId: undefined,
  street: '',
  flat: undefined,
  doorphone: undefined,
  entrance: undefined,
  floor: undefined,
  addressNote: undefined,
  paymentMethodId: '',
})

const isValidPhone = ref(false)
const selectedTimeLabel = ref('')
const isSelectTimeModalOpened = ref(false)
const selectedPaymentMethod = computed(() => paymentMethods.value?.find((m) => m.id === remainingCheckout.paymentMethodId))
const totalPrice = computed(() => (checkout.value?.totalPrice || 0) + (checkout.value?.shippingPrice || 0))

watch(
  () => remainingCheckout.phone,
  () => {
    if (!remainingCheckout.phone) {
      return
    }
    if (remainingCheckout.phone.length > 17) {
      return
    }

    getPhoneNumberFormatter(countryCode.value).input(remainingCheckout.phone)
    isValidPhone.value = checkPhoneNumberValidity(remainingCheckout.phone, countryCode.value)
  },
)

function formatPhone() {
  if (!remainingCheckout.phone) {
    return
  }

  getPhoneNumberFormatter(countryCode.value).input(remainingCheckout.phone)
  remainingCheckout.phone = formatPhoneNumber(remainingCheckout.phone, countryCode.value)
}

async function updateCheckout() {
  const time = remainingCheckout.time ? new Date(remainingCheckout.time) : undefined

  const finishedCheckout = await update({
    phone: remainingCheckout.phone,
    name: remainingCheckout.name,
    warehouseId: remainingCheckout.warehouseId,
    street: remainingCheckout.street,
    flat: remainingCheckout.flat,
    doorphone: remainingCheckout.doorphone,
    entrance: remainingCheckout.entrance,
    floor: remainingCheckout.floor,
    addressNote: remainingCheckout.addressNote,
    paymentMethodId: remainingCheckout.paymentMethodId,
    time,
    timeType: remainingCheckout.timeType,
    change: remainingCheckout.change,
    note: remainingCheckout.note,
  })

  navigateTo(`/finish?id=${finishedCheckout?.result.id}`)
}
</script>
