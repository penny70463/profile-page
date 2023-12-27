<template>
    <div class="fixed top-0 right-0 max-w-md">
        <h2 class="uppercase font-h2 text-lg lg:mt-16 tracking-wider">
            Table of contents
        </h2>
        <nav class="mt-4">
            <ul>
                <li
                    @click="tableOfContentsHeadingClick(link)"
                    class="toc-list pl-4 list-none"
                    v-for="link in content.body.toc.links"
                    :key="link.id"
                    >
                    <a
                    :class="{
                        'text-red-400 hover:text-red-600': link.id === currentlyActiveToc,
                        'hover:gray-900': link.id !== currentlyActiveToc,
                        }"
                    role="button"
                    class="transition-colors duration-75 text-base mb-2 block"
                    :href="`#${link.id}`"
                    >{{ link.text }}</a>
                        <ul>
                            <li
                            @click="tableOfContentsHeadingClick(child)"
                            class="pl-5 list-none"
                            v-for="child in link.children"
                            :key="child.id"
                            >
                            <a
                                :class="{
                                    'text-red-400 hover:text-red-600': child.id === currentlyActiveToc,
                                    'hover:gray-900': child.id !== currentlyActiveToc,
                                    }"
                                role="button"
                                class="transition-colors duration-75 text-base mb-2 block"
                                :href="`#${child.id}`"
                                >{{ child.text }}</a>
                                
                            </li>
                        </ul>
                    </li>
            </ul>
        </nav>
        </div>
    
</template>
<script setup>
const props = defineProps({
    content: Object,
    default: [],
})

const currentlyActiveToc = ref('')
const observer = ref(null)
const articleContent = ref(null)
const observerOptions = {
    root: articleContent.value,
    threshold: 0,
    
}

function tableOfContentsHeadingClick(link) {
    currentlyActiveToc.value = link.id;
}

onMounted(() => {
    observer.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        console.log(entry)
        if (entry.isIntersecting) {
        currentlyActiveToc.value = id;
        }
    });
    }, observerOptions);
    
    document.querySelectorAll('[id]').forEach((section) => {
        observer.value.observe(section);
    });
    
})
</script>