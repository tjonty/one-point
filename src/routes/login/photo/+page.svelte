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

<div>
	<AuthCheck>
		<div
			class="card m-auto mt-20 flex w-11/12 items-center p-4 uppercase shadow-none md:w-4/5 lg:w-1/2"
		>
			<h2 class="card-title text-sm md:text-2xl">Upload a Profile Photo</h2>
			<figure class="py-5">
				<img
					src={previewURL || $userData?.ImageURL || '/images/userImg.png'}
					alt="User Profile"
					class="h-64 w-64 rounded-xl"
				/>
			</figure>
			<div class="card-body items-center text-center">
				<form class="flex flex-col items-center justify-center gap-4">
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Pick a file</legend>
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
							<progress class="progress progress-info mt-6 w-56" />
						</div>
					{/if}
					<div class="card-actions justify-center">
						<a
							href={`/${$userData?.username}/edit`}
							class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover w-full"
						>
							Ready to Go! 🚀
						</a>
					</div>
				</form>
			</div>
		</div>
	</AuthCheck>
</div>
