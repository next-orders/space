<template>
  <div
    class="bg-gray-50 dark:bg-gray-500 rounded-2xl h-auto min-h-60 w-auto max-w-[22rem] p-3 cursor-pointer active:scale-95 lg:active:scale-90 lg:hover:scale-95 duration-200"
  >
    <div class="flex flex-col justify-center items-center h-full text-center">
      <img
        src="~/assets/img/green-notebook.png"
        width="64"
        height="64"
        alt=""
        class="mx-auto mb-4 w-14 h-14"
      >
      <h2 class="text-lg leading-tight">
        {{ $t('center.create.product') }}
      </h2>
    </div>
  </div>
</template>
