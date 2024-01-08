<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Articles" :description="description" />
    <div 
      class="pb-16"
      v-for="{category, list} in articleList" 
      :key="category">
      <div class="text-lg font-bold mb-5">{{ category }}</div>
      <ul class="space-y-16">
        <li v-for="(article, id) in list" :key="id">
          <AppArticleCard :article="article" />
        </li>
      </ul>
    </div>
    
  </main>
</template>

<script setup>
const description =
  "All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.";
useSeoMeta({
  title: "Articles | Penny Kuo",
  description,
});

const articlesMap = new Map()
const articleList = ref([])
const { data: articles } = await useAsyncData("all-articles", () => {
  return queryContent("/articles").sort({ published: -1 }).find()
});

articles.value.forEach(article => {
  if(!articlesMap.has(article.category)) {
    articlesMap.set(article.category, [])
  }
  articlesMap.get(article.category).push(article)
})

for(const [key, val] of articlesMap.entries()) {
  articleList.value.push({category: key, list: val})
}
</script>
