<script lang="ts">
	import { type Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { userData } from '$lib/stores';

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
	<a
		role="tab"
		class="tab bg-white"
		href={`/${$userData?.username}`}
		class:tab-active={currentPath === `/${$userData?.username}`}
	>
		Public Profile
	</a>
	<a
		role="tab"
		class="tab bg-white"
		href={`/${$userData?.username}/edit`}
		class:tab-active={currentPath === `/${$userData?.username}/edit`}
	>
		Edit Mode
	</a>
	<a
		role="tab"
		class="tab bg-white"
		href={`/${$userData?.username}/editbio`}
		class:tab-active={currentPath === `/${$userData?.username}/editbio`}
	>
		Edit Bio
	</a>
</div>

<div class="mx-auto w-full items-center text-center">
	{@render children()}
</div>

<style>
	@reference "tailwindcss/theme";
</style>
