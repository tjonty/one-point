<script lang="ts">
	import SignIn from '$lib/components/SignIn.svelte';
	import { auth } from '$lib/firebase';
	import { currentUser } from '$lib/stores';
	import { signOut } from 'firebase/auth';
</script>

<h2>Login</h2>

<div class="flex flex-col items-center">
	{#if $currentUser}
		<p class="text-2xl">Welcome, {$currentUser.displayName}</p>
		<button on:click={() => signOut(auth)} class="btn btn-soft m-4">Sign out</button>
	{:else}
		<SignIn />
	{/if}
</div>
