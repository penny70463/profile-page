<template>
    <div class="flex flex-col items-center">
        <form 
            v-if="user"
            class="flex flex-col"
            action="/submit" 
            method="post" >
            <textarea 
                id="message" 
                name="message"
                :placeholder="`leave a message as ${user}`"></textarea>
            <button type="submit">送出</button>
        </form>
        <button
            v-if="!user"
            class="bg-blue-500 rounded-lg py-1.5 w-2/3 text-white"  
            @click="() => $signInWithGoogle(setUser)">Sign In With Google To Leave A Message</button>  
        <button 
            v-else
            class="bg-red-500 rounded-lg py-1.5 w-2/3 text-white"  
            @click="() => $signOutWithGoogle(setUser)">Sign Out</button>  
        <div class="messages w-full">
            <div
            class="bg-white dark:bg-slate-800/60 rounded-lg py-3.5 px-5 my-7 flex flex-col"
            v-for="{ author, message, createdAt } in messages"
            :key="createdAt"
            >
            <span class="font-semibold">{{ author }}</span>
            <span class="font-thin text-xs text-gray-500">{{createdAt}}</span>
            <p>{{ message }}</p>
            </div>
        </div>
        </div>
    </template>
<script setup>

const route = useRoute();
const { slug } = route.params;
const { $docs, $signInWithGoogle, $signOutWithGoogle }= useNuxtApp()

const messages = ref([])

$docs.forEach(doc => {
    if(doc.id === slug) {
        for(let key in doc.data()) {
            messages.value.push(doc.data()[key])
        }
    }
})

const user = ref('')
const setUser = (username) => {
    user.value = username
}

</script>