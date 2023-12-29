import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
export default defineNuxtPlugin(async (nuxtApp) => {
    const runtimeConfig = useRuntimeConfig()
    let docs, addNewMessage, signInWithGoogle, signOutWithGoogle
    if (!getApps().length) {
        const app = initializeApp({
            // ...runtimeConfig,
            // projectId: "vast-block-262207",
            // TODO replace here
                apiKey: "AIzaSyC4Rtcrl9hdhvWDuRPB7fLKxETYGJqGFRw",
                authDomain: "vast-block-262207.firebaseapp.com",
                projectId: "vast-block-262207",
                storageBucket: "vast-block-262207.appspot.com",
                messagingSenderId: "864767740820",
                appId: "1:864767740820:web:4b732df9720c3edd939d81",
                measurementId: "G-WZG61JRCGN"
            });
        let db = getFirestore(app, '(default)');
        const messageTable = collection(db,'message-table');
        docs = (await getDocs(messageTable)).docs;
        
        addNewMessage = async (slug) => {
            if(!messages?.docs.some(elm =>  elm.id === slug)) {
                try {
                    const docRef = await addDoc(messageTable, [], { docId: slug });
                    console.log("Document written with ID => ", docRef.id);
                    console.log("success", "新增成功");
                        } catch (error) {
                    console.log("error => ", error);
                    }
            } else {

            }
        }

        signInWithGoogle = (setUser) => {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user.email)
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

        signOutWithGoogle = (setUser) => {
            const auth = getAuth();
            signOut(auth).then(() => {
                // Sign-out successful.
                // TODO dialog inform
                setUser('')
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
        }
    }
});