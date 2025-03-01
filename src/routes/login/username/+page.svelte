<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db } from '$lib/firebase';
	import { currentUser } from '$lib/stores';
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
				console.log('error checking availability: ', error);
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
				ImageURL: $currentUser?.photoURL ?? null,
				published: true,
				bio: 'hello',
				links: [
					{
						title: 'Test',
						url: 'http://test.co',
						icon: 'idle'
					}
				]
			});

			await batch.commit();

			username = '';
			isAvailable = false;
		} catch (error) {
			console.log('error creating username: ', error);
		}
	}
</script>

<AuthCheck>
	<h2>Username</h2>
	<form onsubmit={confirmUserName} class="">
		<input
			name="username"
			type="text"
			placeholder="Username"
			bind:value={username}
			oninput={checkAvailability}
			class:input-error={!isValid && isTouched}
			class:input-warning={isTaken}
			class:input-success={isAvailable && isValid && !isLoading}
		/>

		<div>
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
				<button class="btn btn-success">Confirm username @{username} </button>
			{/if}
		</div>
	</form>
</AuthCheck>
