<template>
  <div class="mb-6 px-4 py-5 md:px-6 md:py-6 bg-white rounded-3xl space-y-5">
    <CartDeliveryMethodSwitch />

    <div class="w-full">
      <h3 class="mb-2 text-lg md:text-xl font-medium">
        Контакты
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2">
        <UiInput
          v-model="phoneNumber"
          type="tel"
          name="phone"
          placeholder="Ваш телефон"
          maxlength="17"
          :class="{ '!outline-emerald-500': isValidPhone }"
          @change="formatPhone"
        />

        <UiInput
          name="name"
          placeholder="Ваше имя"
        />
      </div>
    </div>

    <div v-if="checkout?.deliveryMethod === 'DELIVERY'" class="w-full">
      <h3 class="mb-2 text-lg md:text-xl font-medium">
        Укажите свой адрес
      </h3>
      <UiLabel for="street">
        Улица и дом
      </UiLabel>
      <UiInput
        id="street"
        name="street"
      />

      <div class="mt-2 mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div>
          <UiLabel for="apartment">
            Кв./офис
          </UiLabel>
          <UiInput
            id="apartment"
            name="apartment"
          />
        </div>

        <div>
          <UiLabel for="doorphone">
            Домофон
          </UiLabel>
          <UiInput
            id="doorphone"
            name="doorphone"
          />
        </div>

        <div>
          <UiLabel for="entrance">
            Подъезд
          </UiLabel>
          <UiInput
            id="entrance"
            name="entrance"
          />
        </div>

        <div>
          <UiLabel for="floor">
            Этаж
          </UiLabel>
          <UiInput
            id="floor"
            name="floor"
          />
        </div>
      </div>

      <div>
        <UiLabel for="address-note">
          Комментарий
        </UiLabel>
        <UiTextarea
          id="address-note"
          name="address-note"
          placeholder="Чтобы курьер быстрее вас нашел, укажите дополнительную информацию"
        />
      </div>
    </div>
    <div v-if="checkout?.deliveryMethod === 'WAREHOUSE'">
      <h3 class="mb-2 text-lg md:text-xl font-medium">
        Выберите адрес
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-1 gap-2">
        <UiButton v-for="warehouse in channel?.warehouses" :key="warehouse.id" variant="secondary" class="w-full min-h-14 flex flex-row flex-wrap gap-2 justify-start items-center" @click="selectedWarehouseId = warehouse.id">
          <Icon :name="warehouse.id === selectedWarehouseId ? icons.bookmarkCheck : icons.bookmark" class="w-6 h-6 text-neutral-300" :class="{ 'w-7 h-7 !text-emerald-500': warehouse.id === selectedWarehouseId }" />
          <p class="font-medium text-lg leading-tight break-all">
            {{ warehouse.address }}
          </p>
        </UiButton>
      </div>
    </div>

    <div class="w-full">
      <h2 class="mb-2 text-xl md:text-2xl font-medium">
        Время
      </h2>

      <div class="flex flex-row gap-2 items-center">
        <Icon :name="icons.clock" />
        Ближайшее: 45-60 мин
      </div>
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
