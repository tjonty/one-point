<script lang="ts">
	import { type Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { currentUser } from '$lib/stores';
	import SignOut from '$lib/components/SignOut.svelte';
	import { analytics, trackEvent } from '$lib/firebase';

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

<div class="navbar shadow-sm">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost md:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 text-black shadow"
			>
				<li>
					<button class:nav-active={currentPath === '/login'}> Sign In </button>
				</li>
				<li>
					<button class:nav-active={currentPath === '/login/username'}> Choose Username </button>
				</li>
				<li>
					<button class:nav-active={currentPath === '/login/photo'}> Upload Photo </button>
				</li>
			</ul>
		</div>
		<a href="/" class="text-xl md:pl-4">
			<img src="/images/favicon.png" alt="logo" class="h-12 w-12 md:m-4 md:h-20 md:w-20" />
		</a>
	</div>
	<div class="navbar-center hidden md:flex">
		<ul class="menu menu-horizontal px-1 text-xl">
			<li>
				<button class="cursor-default" class:nav-active={currentPath === '/login'}>
					Sign In
				</button>
			</li>
			<li>
				<button class="cursor-default" class:nav-active={currentPath === '/login/username'}>
					Choose Username
				</button>
			</li>
			<li>
				<button class="cursor-default" class:nav-active={currentPath === '/login/photo'}>
					Upload Photo
				</button>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		{#if $currentUser}
			<SignOut class="btn btn-brand mr-4" />
		{/if}
	</div>
</div>

<div>
	{@render children()}
</div>

<style>
	@reference "tailwindcss/theme";
</style>
