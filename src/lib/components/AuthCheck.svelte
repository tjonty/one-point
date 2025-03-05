<script lang="ts">
	import { currentUser } from '$lib/stores';
	import type { Snippet } from 'svelte';
	import SignIn from './SignIn.svelte';

	let { children }: { children: Snippet } = $props();
</script>

{#if $currentUser}
	{@render children()}
{:else}
	<p class="text-error mt-8 flex flex-col gap-6 lg:mt-16">
		You must be signed in to access this page.
		<SignIn />
	</p>
{/if}
