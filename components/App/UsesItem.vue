<template>
      <p
        class="text-sm text-gray-500 dark:text-gray-300"
      >
        {{ item }}
      </p>
      <!-- <p class="text-sm text-gray-500">{{ item.description }}</p> -->
</template>

<script setup>
defineProps({
  item: String,
  required: true,
});
</script>
