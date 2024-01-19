<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="My skills"
      :description="description"
    />
    <div class="space-y-24">
      <ul class="space-y-8">
        <AppUsesHeader title="Frontend frameworks" />
        <AppUsesItem v-for="(item, id) in frameworks" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="State Management Library" />
        <AppUsesItem v-for="(item, id) in library" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="CSS Library" />
        <AppUsesItem v-for="(item, id) in css" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Programming Languages" />
        <AppUsesItem v-for="(item, id) in languages" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Web Development" />
        <AppUsesItem v-for="(item, id) in development" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Testing" />
        <AppUsesItem v-for="(item, id) in test" :key="id" :item="item" />
      </ul>
      <ul class="space-y-8">
        <AppUsesHeader title="Version Control" />
        <AppUsesItem v-for="(item, id) in version" :key="id" :item="item" />
      </ul>
    </div>
  </main>
</template>

<script setup>
const description =
  "Software tools I use";
useSeoMeta({
  title: "Things I use | Penny Kuo",
  description,
});

const frameworks = ['Vue ( both 2 & 3 )、Nuxt 3+', 'React']
const library = ['Vuex', 'Pinia']
const css = ['Styled Components', 'Tailwind']
const languages = ['HTML', 'CSS/SCSS', 'JavaScript ( ES6+ )']
const development = ['SPA/SSR', 'Quasar', 'Element UI', 'i18n', 'CI/CD(GitHub Actions)']
const test = ['Jest']
const version = ['Source Tree', 'GitHub', 'Fork', 'Azure DevOps']
</script>
