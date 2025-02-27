import { onAuthStateChanged, type User } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "./firebase";


export const currentUser = writable<User | null>(null);

onAuthStateChanged(auth, async (user) => {
    currentUser.set(user);
});