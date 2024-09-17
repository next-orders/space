<template>
  <div
    class="z-40 fixed left-0 right-0 -top-20 -bottom-20 bg-neutral-700/50 opacity-0 data-[active=true]:opacity-100 data-[active=true]:backdrop-blur-sm translate-x-full data-[active=true]:-translate-x-0 transition-opacity"
    :data-active="isModalOpened"
    @click="handleClose"
  />
  <div
    class="z-40 fixed left-0 top-0 w-full max-w-lg max-h-[100dvh] overflow-y-auto p-2 m-0 pb-20 shadow-none rounded-2xl -translate-x-full data-[active=true]:translate-x-0 data-[active=true]:right-0 data-[active=true]:mx-auto transition-transform"
    :data-active="isModalOpened"
  >
    <div class="mt-16 p-4 md:p-6 lg:p-8 bg-white rounded-2xl shadow-lg">
      <div class="mb-4 flex flex-row justify-between items-center">
        <h3 class="text-xl md:text-2xl font-medium">
          {{ title }}
        </h3>

        <button
          aria-label="Close"
          class="flex items-center rounded-xl hover:scale-90 hover:bg-neutral-100 duration-200"
          @click="handleClose"
        >
          <Icon :name="icons.close" class="w-8 h-8" />
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  onClose?: () => void
}>()

const { icons } = useAppConfig()
const { isModalOpened } = useCommandCenter()

function handleClose() {
  isModalOpened.value = false
  if (props.onClose) {
    props.onClose()
  }
}
</script>
