<template>
  <div class="p-3 md:p-6 bg-white dark:bg-neutral-600 rounded-3xl space-y-5">
    <CartDeliveryMethodSwitch />

    <div class="w-full">
      <h3 class="mb-2 text-lg md:text-xl font-medium">
        {{ $t('app.checkout.contacts') }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <UiInput
          v-model="phoneNumber"
          type="tel"
          name="phone"
          :placeholder="$t('app.checkout.your-phone')"
          maxlength="17"
          :class="{ '!outline-emerald-500': isValidPhone }"
          @change="formatPhone"
        />

        <UiInput
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
        name="street"
      />

      <div class="mt-2 mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <UiLabel for="flat">
            {{ $t('app.checkout.address.flat') }}
          </UiLabel>
          <UiInput
            id="flat"
            name="flat"
          />
        </div>

        <div>
          <UiLabel for="doorphone">
            {{ $t('app.checkout.address.doorphone') }}
          </UiLabel>
          <UiInput
            id="doorphone"
            name="doorphone"
          />
        </div>

        <div>
          <UiLabel for="entrance">
            {{ $t('app.checkout.address.entrance') }}
          </UiLabel>
          <UiInput
            id="entrance"
            name="entrance"
          />
        </div>

        <div>
          <UiLabel for="floor">
            {{ $t('app.checkout.address.floor') }}
          </UiLabel>
          <UiInput
            id="floor"
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
        <UiButton v-for="warehouse in channel?.warehouses" :key="warehouse.id" variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="selectedWarehouseId = warehouse.id">
          <Icon :name="warehouse.id === selectedWarehouseId ? icons.mapPinCheck : icons.mapPinWarehouse" class="w-6 h-6 text-neutral-300" :class="{ '!text-emerald-500': warehouse.id === selectedWarehouseId }" />
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

      <div class="flex flex-row gap-2 items-center">
        <Icon :name="icons.clock" />
        Как можно скорее: 45-60 мин
      </div>

      <div>Сегодня мы принимаем заказы с 10:00 до 22:00</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icons } = useAppConfig()
const { channel } = await useChannel()
const { checkout } = useCheckout()

const selectedWarehouseId = ref('')
const phoneNumber = ref('')
const countryCode = computed(() => channel.value?.countryCode as CountryCode)
const isValidPhone = ref(false)

watch(
  () => phoneNumber.value,
  () => {
    if (phoneNumber.value.length > 17) {
      return
    }

    getPhoneNumberFormatter(countryCode.value).input(phoneNumber.value)
    isValidPhone.value = checkPhoneNumberValidity(phoneNumber.value, countryCode.value)
  },
)

function formatPhone() {
  getPhoneNumberFormatter(countryCode.value).input(phoneNumber.value)
  phoneNumber.value = formatPhoneNumber(phoneNumber.value, countryCode.value)
}
</script>
