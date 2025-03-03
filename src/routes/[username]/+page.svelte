<script lang="ts">
	import UserLink from '$lib/components/UserLink.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>@{data.username}</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<main class="prose mx-auto mt-10 flex flex-col gap-6 text-center uppercase">
	<h1 class="text-xl text-[#C84B31] md:text-4xl">
		@{data.username}
	</h1>

	<img src={data.ImageURL ?? '/userImg.png'} alt="" width="256" class="mx-auto" />

	<p class="text-xl">{data.bio ?? 'no bio yet...'}</p>
	<ul class="list-none">
		{#each data.links as item}
			<li class="m-2">
				<UserLink {...item} />
			</li>
		{/each}
	</ul>
</main>
