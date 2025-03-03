<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();
</script>

<main class="prose mx-auto my-6 max-w-lg text-center">
	<p>Current Bio: <span class="text-info">{data.bio}</span></p>

	<p class="text-error">{$page.form?.problem ?? ''}</p>
	<form method="POST">
		<div class="form-control m-auto flex flex-col items-center">
			<label for="bio" class="label">
				<span class="label-text">Your bio</span>
			</label>
			<textarea name="bio" class="textarea textarea-bordered" value={data.bio}></textarea>
		</div>
		<button class="btn btn-success my-5">Update Bio</button>
	</form>
</main>
