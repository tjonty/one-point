<script lang="ts">
	import { auth } from '$lib/firebase';
	import { currentUser } from '$lib/stores';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		user && console.log('user securely signed in.');
	}
</script>

<h2>Login</h2>

<div class="flex flex-col items-center">
	{#if $currentUser}
		<p class="text-2xl">Welcome, {$currentUser.displayName}</p>
		<button on:click={() => signOut(auth)} class="btn-add !m-4">Sign out</button>
	{:else}
		<button on:click={signInWithGoogle} class="btn-add !m-4">Sign in with Google</button>
	{/if}
</div>
