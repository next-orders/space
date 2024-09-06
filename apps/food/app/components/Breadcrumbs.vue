<template>
  <div class="mb-6 flex flex-row justify-between items-center">
    <nav class="hidden lg:block">
      <ol class="flex flex-row flex-wrap gap-y-2 items-center">
        <li v-for="link in links" :key="link.title" class="relative max-w-[20rem] after:content-['/'] after:px-1 after:text-lg after:text-gray-300 last:after:content-['']">
          <NuxtLink
            :to="link.href"
            class="px-3 py-2 inline-block leading-tight rounded-xl active:scale-95 lg:hover:bg-gray-200 lg:hover:scale-95 lg:active:scale-90 duration-200 bg-gray-50 data-[active=true]:bg-gray-50"
            :data-active="link.href === '#'"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ol>
    </nav>

    <div class="w-full lg:w-auto mx-auto md:mx-0">
      <button
        class="px-5 py-3 w-full flex flex-row gap-2 justify-center items-center text-base font-normal cursor-pointer rounded-2xl bg-gray-200 active:scale-95 hover:bg-gray-300 lg:hover:scale-95 lg:active:scale-90 duration-200"
        @click="back()"
      >
        <Icon :name="icons.undo" size="20" /> Вернуться
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { links } = defineProps<{
  links: { title: string, href: string }[]
}>()

const { icons } = useAppConfig()
const { back } = useRouter()
</script>
