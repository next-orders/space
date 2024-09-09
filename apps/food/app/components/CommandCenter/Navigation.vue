<template>
  <nav
    :data-active="isNavbarOpened"
    class="z-10 w-0 invisible 2xl:visible 2xl:w-72 fixed top-16 data-[active=true]:w-full data-[active=true]:visible md:data-[active=true]:w-72"
  >
    <div class="w-full bg-gray-50 px-4 pt-4 border-r border-gray-100">
      <div class="h-[calc(100vh-64px)] overflow-y-auto flex flex-col justify-between">
        <div class="mb-32">
          <div class="flex flex-row items-center pb-2">
            <div class="font-semibold text-xl">
              Командный центр
            </div>
          </div>

          <CommandCenterNavigationButton v-for="(item, index) in menu" :key="index" :label="item.label" :link="item.link" :icon="item.icon" />
        </div>

        <div class="mb-8 px-2 py-3 border rounded-2xl flex flex-row gap-2 items-center">
          <img
            :src="userAvatar"
            width="40"
            height="40"
            alt=""
            class="w-12 h-12 rounded-full cursor-pointer hover:scale-95 duration-200"
            @click="() => {}"
          >
          <div>
            <p>Админ</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isNavbarOpened } = useCommandCenter()
const { icons } = useAppConfig()
const menu = [
  {
    label: 'Панель управления',
    link: '/command-center',
    icon: icons.dashboard,
  },
  {
    label: 'Меню',
    link: '/',
    icon: icons.list,
  },
  {
    label: 'Заявки',
    link: '/',
    icon: icons.checkouts,
  },
  {
    label: 'Клиенты',
    link: '/',
    icon: icons.users,
  },
  {
    label: 'Настройки',
    link: '/',
    icon: icons.options,
  },
]

const userAvatar = '/burger-1.jpg'
</script>
