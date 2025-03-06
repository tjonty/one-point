<script lang="ts">
	import { page } from '$app/stores';
	import SignIn from '$lib/components/SignIn.svelte';
</script>

<div class="flex flex-col gap-6">
	<h1 class="mt-8 lg:mt-16">{$page.status}: {$page.error?.message}</h1>
	<a href="/" class="btn btn-brand btn-hover btn-lg xl:btn-xl mx-auto w-fit"> Visit Home Page </a>
</div>
