<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { analytics, trackEvent } from '$lib/firebase';
	import '../app.css';
	let { children } = $props();

	afterNavigate(() => {
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

<div class="flex min-h-screen flex-col">
	{@render children()}
</div>

<style>
	@media (prefers-color-scheme: dark) {
		:global(body) {
			background-color: #000000;
			color: #ffffff;
		}
	}
</style>
