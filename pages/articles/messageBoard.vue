<template>
    <div class="flex flex-col items-center">
        <div 
            v-if="user"
            class="flex flex-col"
            >
            <textarea 
                id="message" 
                name="message"
                v-model="message"
                :placeholder="`leave a message as ${user}`"></textarea>
            <button :disabled="!message" @click="$addNewMessage({slug, messagePack, getMessages})">送出</button>
        </div>
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
const { $docs, $signInWithGoogle, $signOutWithGoogle, $addNewMessage } = useNuxtApp()

const messages = ref([])
const message = ref('')
const id = ref(0)
const user = ref('')
const collection = ref({})
const setUser = (username) => {
    user.value = username
}

function resetMessages() {
    messages.value = []
    message.value = ''
}

function getMessages(docs = $docs) {
    resetMessages()
    docs.forEach(doc => {
    if(doc.id === slug) {
        collection.value = doc.data()
        for(let key in doc.data()) {
            messages.value.push(doc.data()[key])
        }
        id.value = messages.value.length++
        messages.value = messages.value.filter(elm =>!!elm)
    }
})
}

const newMessage = computed(() =>({
    author: user.value,
    message: message.value,
    createdAt: new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    })
}))

const messagePack = computed(() =>  ( messages.value.length ?
    {[id.value]: newMessage.value, ...collection.value} : {[id.value]: newMessage.value}))

onMounted(() => {
    getMessages()
})
</script>