<script lang="ts">
	import { page } from '$app/stores';
	import SignIn from '$lib/components/SignIn.svelte';
</script>

<div class="flex flex-col gap-6">
	<h1 class="mt-8 lg:mt-16">{$page.status}: {$page.error?.message}</h1>
	<SignIn />
</div>
