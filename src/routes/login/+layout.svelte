<script lang="ts">
	import { type Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let { children }: { children: Snippet } = $props();

	let currentPath = $state('');

	afterNavigate((navigation) => {
		currentPath = navigation.to?.url.pathname as string;
	});
</script>

<div
	role="tablist"
	class="tabs tabs-lift tabs-md md:tabs-xl flex flex-row items-center justify-evenly bg-black p-4"
>
	<a role="tab" class="tab bg-white" href="/login" class:tab-active={currentPath === '/login'}
		>Sign In</a
	>
	<a
		role="tab"
		class="tab bg-white"
		href="/login/username"
		class:tab-active={currentPath === '/login/username'}>Choose Username</a
	>
	<a
		role="tab"
		class="tab bg-white"
		href="/login/photo"
		class:tab-active={currentPath === '/login/photo'}>Choose Photo</a
	>
</div>

<div class="mx-auto w-4/6 items-center text-center">
	{@render children()}
</div>

<style>
	@reference "tailwindcss/theme";
</style>
