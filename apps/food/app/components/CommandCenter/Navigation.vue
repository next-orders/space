<template>
  <Navigation>
    <div class="mb-32">
      <div class="flex flex-row items-center pb-2">
        <div class="font-semibold text-xl">
          {{ $t('center.title') }}
        </div>
      </div>

      <CommandCenterNavigationButton v-for="(item, index) in menu" :key="index" :label="item.label" :link="item.link" :icon="item.icon" />
    </div>

    <div class="mb-6 flex flex-col gap-2">
      <div class="flex flex-row gap-2">
        <ColorModeToggle />
        <LanguageSwitch />
      </div>

      <div class="px-2 py-3 bg-neutral-100 dark:bg-neutral-600 rounded-2xl flex flex-row gap-2 items-center">
        <img
          :src="userAvatar"
          width="40"
          height="40"
          alt=""
          class="w-12 h-12 rounded-full cursor-pointer hover:scale-95 duration-200"
          @click="() => {}"
        >
        <div>
          <p class="font-semibold text-lg">
            {{ user?.name ?? $t('common.colleague') }}
          </p>
          <button @click="signOut">
            {{ $t('common.sign-out') }}
          </button>
        </div>
      </div>
    </div>
  </Navigation>
</template>

<script setup lang="ts">
const { user, clear, fetch: refreshSession } = useUserSession()
const { icons } = useAppConfig()
const { t } = useI18n()
const menu = computed(() => [
  {
    label: t('center.menu.dashboard'),
    link: '/command-center',
    icon: icons.dashboard,
  },
  {
    label: t('center.menu.title'),
    link: '/command-center/menu',
    icon: icons.list,
  },
  {
    label: t('center.menu.warehouses'),
    link: '/command-center/warehouse',
    icon: icons.mapPinWarehouse,
  },
  {
    label: t('center.menu.checkouts'),
    link: '/command-center/checkout',
    icon: icons.checkouts,
  },
  {
    label: t('center.menu.settings'),
    link: '/command-center/system',
    icon: icons.options,
  },
])

const userAvatar = '/api/avatar/admin.svg'

async function signOut() {
  await clear()
  await refreshSession()
  await navigateTo('/command-center/sign-in')
}
</script>
