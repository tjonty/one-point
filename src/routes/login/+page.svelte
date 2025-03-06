<script lang="ts">
	import SignIn from '$lib/components/SignIn.svelte';
	import SignOut from '$lib/components/SignOut.svelte';
	import { currentUser } from '$lib/stores';
</script>

<div class="m-auto flex w-11/12 flex-col gap-8 p-4 uppercase md:w-4/5 lg:w-1/2">
	{#if $currentUser}
		<h2 class="items-end justify-center text-center text-nowrap">
			Welcome, <span class="pl-4 text-3xl">{$currentUser!.displayName}</span>
		</h2>
		<p class="text-success">You are logged in sucessfully!</p>
		<div class="flex flex-col gap-6">
			<a
				href="/login/username"
				class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover mx-auto w-9/12"
			>
				Choose Username
			</a>
			<SignOut />
		</div>
	{:else}
		<SignIn />
	{/if}
</div>
