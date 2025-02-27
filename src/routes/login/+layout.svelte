<script lang="ts">
	import { type Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let { children }: { children: Snippet } = $props();

	let currentPath = $state('');

	afterNavigate((navigation) => {
		currentPath = navigation.to?.url.pathname as string;
	});
</script>

<nav
	class="flex w-full flex-row items-center justify-evenly border-b-2 border-amber-700 p-4 text-center"
>
	<a href="/login" class:active={currentPath === '/login'}>Sign In</a>
	<a href="/login/username" class:active={currentPath === '/login/username'}>Choose Username </a>
	<a href="/login/photo" class:active={currentPath === '/login/photo'}>Choose Photo </a>
</nav>

<div class="mx-auto w-4/6 items-center text-center">
	{@render children()}
</div>

<style>
	@reference "tailwindcss/theme";
</style>
