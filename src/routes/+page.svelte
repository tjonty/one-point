<script>
	import { currentUser, userData } from '$lib/stores';
</script>

<div class="m-auto flex w-11/12 flex-col items-center gap-8 p-4 uppercase md:w-4/5 lg:w-1/2">
	<img src="/images/favicon.png" alt="Onepoint Logo" class="h-16 w-16 rounded-xl lg:h-40 lg:w-40" />
	<h2 class="">Onepoint</h2>
	<p>Craft a sleek, all-in-one page where every professional link shines in a single spotlight.</p>
	<div class="flex w-full flex-col gap-4">
		{#if $currentUser}
			<a
				href={`/${$userData?.username}/edit`}
				class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover mx-auto w-9/12"
			>
				Edit Profile
			</a>
		{:else}
			<a href="/login" class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover mx-auto w-9/12">
				Get Started
			</a>
			<a href="/tjonty23" class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover mx-auto w-9/12">
				Sample Profile
			</a>
		{/if}
	</div>
</div>
<div class="m-4 flex justify-end">
	developed by
	<a class="!text-warning pl-2" href="/tjonty23" target="_blank"> Jonty Tejani </a>
</div>
