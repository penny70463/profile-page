<template>
  <div class="space-y-6">
    <NuxtImg src="/avatar.jpg" alt="Fayaz Ahmed"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px" placeholder format="webp" />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      Hello!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      I'm Penny, a front-end engineer with a passion for creating effective and user-friendly 
      web experiences. Always looking for new ways to push the boundaries of what's possible 
      with the web.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Penny Kuo",
  description:
    `I'm Penny, a front-end engineer with a passion for creating effective and user-friendly 
      web experiences. Always looking for new ways to push the boundaries of what's possible 
      with the web.`,
});
</script>
