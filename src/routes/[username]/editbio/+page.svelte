<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-auto flex w-11/12 flex-col gap-8 p-4 uppercase md:w-4/5 lg:w-1/2">
	<p>Current Bio: <span class="text-info">{data.bio}</span></p>

	<p class="text-error" class:hidden={!$page.form?.problem}>{$page.form?.problem}</p>

	<form method="POST" class="flex flex-col items-center gap-6">
		<div class="form-control m-auto flex w-7/12 flex-col items-center gap-4">
			<label for="bio" class="label">
				<span class="label-text">Your bio</span>
			</label>
			<textarea name="bio" class="textarea textarea-bordered w-full text-black" value={data.bio}
			></textarea>
		</div>
		<button class="btn btn-success btn-lg xl:btn-xl w-5/12"> Update Bio </button>
	</form>
</div>
