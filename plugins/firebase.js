import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"

export default defineNuxtPlugin(async (nuxtApp) => {
    const { public: config } = useRuntimeConfig()
    console.log(config, 'runtimeConfig')
    let docs, addNewMessage, signInWithGoogle, signOutWithGoogle
    if (!getApps().length) {
        const app = initializeApp({
            // TODO replace here
                apiKey: config.apiKey,
                authDomain: config.authDomain,
                projectId: config.projectId,
                storageBucket: config.storageBucket,
                messagingSenderId: config.messagingSenderId,
                appId: config.appId,
                measurementId: config.measurementId,
            });
        let db = getFirestore(app, '(default)');
        const messageTable = collection(db,'message-table');
        
        async function getDocuments() {
            docs = (await getDocs(messageTable)).docs;
        }

        await getDocuments()
        addNewMessage = async ({slug, messagePack, getMessages}) => {
            try {
                await setDoc(doc(db, "message-table", slug), messagePack);
                await getDocuments()
                getMessages(docs)
                alert('Submit success!')
            } catch (error) {
                console.log("error => ", error);
            }
        }

        signInWithGoogle = (setUser) => {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then((result) => {
                const { user: {email} } = result
                setUser(email.substring(0, email.indexOf("@")))
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorMessage)
            });
        }

        signOutWithGoogle = (setUser, resetMessage) => {
            const auth = getAuth();
            signOut(auth).then(() => {
                // Sign-out successful.
                setUser('')
                resetMessage()
                }).catch((error) => {
                // An error happened.
                console.log(error)
                });
        }
    }
    return {
        provide: {
            docs,
            signInWithGoogle,
            signOutWithGoogle,
            addNewMessage
        }
    }
});