<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, storage, trackEvent } from '$lib/firebase';
	import { currentUser, userData } from '$lib/stores';
	import { doc, updateDoc } from 'firebase/firestore';

	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	let previewURL = $state('');
	let isUploading = $state(false);

	async function upload(e: any) {
		isUploading = true;
		const file = e.target.files[0];
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$currentUser!.uid}/profile.png`);

		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);

		await updateDoc(doc(db, 'users', $currentUser!.uid), { ImageURL: url });

		isUploading = false;
		trackEvent('form_submission', {
			form_name: 'profile_photo_form',
			status: 'success'
		});
	}
</script>

<AuthCheck>
	<div class="m-auto mt-10 flex w-11/12 flex-col gap-8 p-4 uppercase md:w-4/5 lg:mt-16 lg:w-1/2">
		<h2 class="text-sm md:text-2xl">Upload a Profile Photo</h2>
		<img
			src={previewURL || $userData?.ImageURL || '/images/userImg.png'}
			alt="User Profile"
			class="mx-auto h-64 w-64 rounded-xl"
		/>
		<form class="flex w-full flex-col items-center gap-6">
			<fieldset class="fieldset">
				<legend class="fieldset-legend text-start text-white">Pick a file</legend>
				<input
					name="profilePhoto"
					type="file"
					class="file-input file-input-xs lg:file-input-md"
					onchange={upload}
					accept="image/webp, image/png, img/jpeg, img/gif"
				/>
				<!-- <label class="fieldset-label text-xs" for="profilephoto">Max size 2MB</label> -->
			</fieldset>
			{#if isUploading}
				<div>
					<p>Uploading...</p>
					<progress class="progress progress-info mt-6 w-56"></progress>
				</div>
			{/if}
			<a
				href={`/${$userData?.username}/edit`}
				class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover w-9/12"
			>
				Ready to Go! 🚀
			</a>
		</form>
	</div>
</AuthCheck>
