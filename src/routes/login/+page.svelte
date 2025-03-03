<script lang="ts">
	import SignIn from '$lib/components/SignIn.svelte';
	import SignOut from '$lib/components/SignOut.svelte';
	import { auth } from '$lib/firebase';
	import { currentUser } from '$lib/stores';
	import { signOut } from 'firebase/auth';
</script>

<div
	class="card bg-base-100 m-auto mt-20 flex w-5/6 items-center border-none uppercase shadow-none"
>
	<div class="card-body border-2 border-amber-50 text-center">
		{#if $currentUser}
			<h2 class="card-title m-4 items-end justify-center !text-center text-nowrap">
				Welcome, <span class="text-3xl">{$currentUser.displayName}</span>
			</h2>
			<p class="text-success-content m-4">You are logged in sucessfully!</p>
			<div class="card-actions justify-center">
				<a href="/login/username" class="btn btn-brandbtn-md lg:btn-lg xl:btn-xl btn-hover w-full">
					Choose Username
				</a>
				<SignOut />
			</div>
		{:else}
			<SignIn />
		{/if}
	</div>
</div>
