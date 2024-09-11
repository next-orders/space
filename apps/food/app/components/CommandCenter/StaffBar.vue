<template>
  <div class="relative px-4 pt-4 pb-2">
    <div class="bg-white dark:bg-gray-600 p-4 flex justify-between items-center rounded-2xl">
      <p class="grow text-lg">
        Привет, админ!
      </p>

      <NuxtLink to="/command-center" class="button-gradient-command-center px-4 py-3 flex flex-row gap-2 flex-wrap justify-between items-center rounded-xl cursor-pointer active:scale-95 lg:hover:scale-95 lg:active:scale-90 duration-200">
        Продолжить работу
      </NuxtLink>
    </div>
  </div>
</template>
