import { onAuthStateChanged, type User } from "firebase/auth";
import { derived, writable, type Readable } from "svelte/store";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";


export const currentUser = writable<User | null>(null);

onAuthStateChanged(auth, async (user) => {
    currentUser.set(user);
});

export function docStore<T>(path: string) {
    let unsubscribe: () => void;
    const docRef = doc(db, path);

    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    })

    return {
        subscribe,
        id: docRef.id,
        ref: docRef,
    }
}

export const userData: Readable<UserData | null> = derived(currentUser, ($currentUser: any, set: any) => {
    if ($currentUser) {
        return docStore(`users/${$currentUser.uid}`).subscribe(set)
    } else {
        set(null)
    }
})