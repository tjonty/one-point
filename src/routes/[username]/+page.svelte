<script lang="ts">
	import UserLink from '$lib/components/UserLink.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>@{data.username} | Onepoint</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<div class="m-auto flex w-11/12 flex-col gap-8 uppercase md:w-4/5 lg:w-1/2">
	<h1 class="text-success text-xl lowercase md:text-4xl">
		@{data.username}
	</h1>

	<img src={data.ImageURL ?? '/userImg.png'} alt="" width="256" class="mx-auto rounded-lg" />

	<p class="text-xl">{data.bio ?? 'no bio yet...'}</p>
	<ul class="flex list-none flex-col gap-6">
		{#each data.links as item}
			<li class="w-full">
				<UserLink {...item} class="hidden" />
			</li>
		{/each}
	</ul>
</div>
