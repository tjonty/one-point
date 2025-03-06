<script lang="ts">
	import { type Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { analytics, trackEvent } from '$lib/firebase';
	import ProfileNavbar from '$lib/components/ProfileNavbar.svelte';

	let { children }: { children: Snippet } = $props();

	let currentPath = $state('');

	afterNavigate((navigation) => {
		currentPath = navigation.to?.url.pathname as string;
		if (analytics) {
			const url = window.location.pathname + window.location.search;
			trackEvent('page_view', {
				page_path: url,
				page_title: document.title,
				page_location: window.location.href
			});
		}
	});
</script>

<ProfileNavbar />

<div class="mx-auto mb-16 w-full items-center text-center">
	{@render children()}
</div>

<style>
	@reference "tailwindcss/theme";
</style>
