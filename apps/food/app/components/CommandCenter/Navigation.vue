<template>
  <nav
    :data-active="isNavbarOpened"
    class="z-10 w-0 invisible 2xl:visible 2xl:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:visible md:data-[active=true]:w-72"
  >
    <div class="w-full bg-gray-50 dark:bg-gray-700 px-4 pt-4 border-r border-gray-100 dark:border-gray-500">
      <div class="h-[calc(100vh-64px)] overflow-y-auto flex flex-col justify-between">
        <div class="mb-32">
          <div class="flex flex-row items-center pb-2">
            <div class="font-semibold text-xl">
              {{ $t('center.title') }}
            </div>
          </div>

          <CommandCenterNavigationButton v-for="(item, index) in menu" :key="index" :label="item.label" :link="item.link" :icon="item.icon" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2">
            <ColorModeToggle />
            <LanguageSwitch />
          </div>

          <div class="mb-8 px-2 py-3 bg-gray-100 dark:bg-gray-600 rounded-2xl flex flex-row gap-2 items-center">
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
                Админ
              </p>
              <button @click="signOut">
                {{ $t('common.sign-out') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { clear, fetch: refreshSession } = useUserSession()
const { isNavbarOpened } = useCommandCenter()
const { icons } = useAppConfig()
const { t } = useI18n()
const menu = computed(() => [
  {
    label: t('center.menu.dashboard'),
    link: '/command-center',
    icon: icons.dashboard,
  },
  {
    label: t('center.menu.menu'),
    link: '/',
    icon: icons.list,
  },
  {
    label: t('center.menu.checkouts'),
    link: '/',
    icon: icons.checkouts,
  },
  {
    label: t('center.menu.clients'),
    link: '/',
    icon: icons.users,
  },
  {
    label: t('center.menu.settings'),
    link: '/command-center/system',
    icon: icons.options,
  },
])

const userAvatar = '/burger-1.jpg'

async function signOut() {
  await clear()
  await refreshSession()
  await navigateTo('/command-center/sign-in')
}
</script>
