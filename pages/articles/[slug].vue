<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }" tag="article" ref="articleContent">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
          <MessageBoard />
        </article>
        <TableOfContent :content="doc"/>
      </ContentDoc>
    </div>
  </main>
</template>
<script setup>
import TableOfContent from './tableOfContent.vue';
import MessageBoard from './messageBoard.vue'
useSeoMeta({
  articleAuthor: "Penny Kuo",
});


</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
