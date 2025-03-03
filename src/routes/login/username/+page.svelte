<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, trackEvent } from '$lib/firebase';
	import { currentUser, userData } from '$lib/stores';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	let username = $state('');
	let isAvailable = $state(false);
	let isLoading = $state(false);
	let debounceTimer: NodeJS.Timeout;

	const re = /^(?=[a-zA-Z0-9._]{5,17}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	let isValid = $derived(username?.length > 2 && username.length < 16 && re.test(username));
	let isTouched = $derived(username.length > 0);
	let isTaken = $derived(isValid && !isAvailable && !isLoading);

	async function checkAvailability() {
		isLoading = true;
		clearTimeout(debounceTimer);
		isAvailable = false;

		if (!isValid) {
			isLoading = false;
			return;
		}

		debounceTimer = setTimeout(async () => {
			try {
				const usernameRef = doc(db, 'usernames', username);

				const docs = await getDoc(usernameRef);

				isAvailable = !docs.exists();

				isLoading = false;
			} catch (error) {
				console.error('error checking availability: ', error);
			}
		}, 600);
	}

	async function confirmUserName(e: SubmitEvent) {
		try {
			e.preventDefault();
			const batch = writeBatch(db);
			batch.set(doc(db, 'usernames', username), { uid: $currentUser?.uid });
			batch.set(doc(db, 'users', $currentUser!.uid), {
				username,
				ImageURL: null,
				isPublic: true,
				bio: 'new bio',
				links: [
					{
						title: 'Test',
						url: 'http://test.co',
						icon: 'linkIcon'
					}
				]
			});

			await batch.commit();

			username = '';
			isAvailable = false;

			trackEvent('form_submission', {
				form_name: 'username_create_form',
				status: 'success'
			});
		} catch (error) {
			console.error('error creating username: ', error);
		}
	}
</script>

<div>
	<AuthCheck>
		<div
			class="card bg-base-100 m-auto mt-20 flex w-5/6 items-center border-none uppercase shadow-none"
		>
			<div class="card-body">
				{#if $userData?.username}
					<h2 class="card-title m-4 items-end">
						your username: <span class=" text-3xl">{$userData.username}</span>
					</h2>
					<p>username cannot be changed!</p>
					<div class="card-actions justify-center">
						<a
							href="/login/photo"
							class="btn btn-brand btn-md lg:btn-lg xl:btn-xl btn-hover w-full"
						>
							Choose Profile Photo
						</a>
					</div>
				{:else}
					<form onsubmit={confirmUserName}>
						<label class="input">
							<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								><g
									stroke-linejoin="round"
									stroke-linecap="round"
									stroke-width="2.5"
									fill="none"
									stroke="currentColor"
									><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g
								></svg
							>
							<input
								type="text"
								name="username"
								class="grow"
								placeholder="Username"
								bind:value={username}
								oninput={checkAvailability}
								class:input-error={!isValid && isTouched}
								class:input-warning={isTaken}
								class:input-success={isAvailable && isValid && !isLoading}
							/>
						</label>
						<div class="m-2">
							{#if isLoading}
								<p class="text-secondary">Checking availability of @{username}...</p>
							{/if}

							{#if !isValid && isTouched}
								<p class="text-error text-sm">must be 5-16 characters long, alphanumeric only</p>
							{/if}

							{#if isValid && !isAvailable && !isLoading}
								<p class="text-warning text-sm">
									@{username} is not available
								</p>
							{/if}

							{#if isAvailable}
								<div class="card-actions justify-center">
									<button class="btn btn-md xl:btn-lg btn-soft btn-success m-2">
										Confirm username @{username}
									</button>
								</div>
							{/if}
						</div>
					</form>
				{/if}
			</div>
		</div></AuthCheck
	>
</div>
