<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { currentUser, userData } from '$lib/stores';
	import { page } from '$app/stores';
	import SortableList from '$lib/components/SortableList.svelte';
	import UserLink from '$lib/components/UserLink.svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import SignOut from '$lib/components/SignOut.svelte';

	let { data }: { data: PageData } = $props();
	const formDefaults = {
		icon: 'linkIcon',
		title: '',
		url: 'https://'
	};

	const formData = writable(formDefaults);

	let icons: string[] = $state(['LinkedIn', 'GitHub', 'Twitter', 'YouTube', 'Custom']);
	let showForm = $state(false);

	let urlIsValid = $derived($formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/));
	let titleIsValid = $derived($formData.title.length < 20 && $formData.title.length > 0);
	let formIsValid = $derived(urlIsValid && titleIsValid);

	async function addLink(e: any) {
		e.preventDefault();
		const userRef = doc(db, 'users', $currentUser!.uid);

		await updateDoc(userRef, {
			links: arrayUnion({
				...$formData,
				id: Date.now().toString()
			})
		});

		formData.set({
			icon: '',
			title: '',
			url: ''
		});

		showForm = false;
	}

	async function toggleProfileStatus(item: any) {
		const userRef = doc(db, 'users', $currentUser!.uid);
		await updateDoc(userRef, {
			isPublic: !$userData?.isPublic
		});
	}

	async function deleteLink(link: any) {
		const userRef = doc(db, 'users', $currentUser!.uid);

		await updateDoc(userRef, {
			links: arrayRemove(link)
		});
	}

	async function cancelLink() {
		formData.set(formDefaults);
		showForm = false;
	}

	function sortList(e: CustomEvent) {
		const newList = e.detail;
		const userRef = doc(db, 'users', $currentUser!.uid);
		setDoc(userRef, { links: newList }, { merge: true });
	}
</script>

<AuthCheck>
	<div class="mt-10 flex w-full flex-col items-center p-4 text-center uppercase shadow-none">
		{#if $userData?.username === $page.params.username}
			<h2 class="card-title text-xl">Edit your profile</h2>

			<p class="my-4 flex flex-col items-center">
				Access your profile:
				<br />
				<span class="text-xl lowercase">
					<a href={`https://onepoint/${$userData.username}`}>
						https://onepoint/{$userData.username}
					</a>
				</span>
			</p>

			<a href="/login/photo" class="badge badge-soft badge-neutral my-2"> change profile photo </a>

			<form class="form-control my-2 text-xs">
				<label class="label flex cursor-pointer items-start justify-center">
					<span class="label-text mr-6">
						<div
							class="tooltip group-hover:tooltip-open"
							data-tip="If public, the world can see your profile"
						>
							{$userData?.isPublic ? 'Public profile' : 'Private profile'}
						</div>
					</span>
					<input
						type="checkbox"
						class=" toggle toggle-xs toggle-success"
						checked={$userData?.isPublic}
						onchange={toggleProfileStatus}
					/>
				</label>
			</form>

			<SortableList list={$userData?.links ?? []} on:sort={sortList}>
				{#snippet children({ link, index })}
					<div class="group relative">
						<UserLink {...link} {index} />
						<button
							onclick={() => deleteLink(link)}
							class="btn btn-xs btn-dash btn-error absolute -right-6 bottom-9 transition-all group-hover:visible"
							>Delete</button
						>
					</div>
				{/snippet}
			</SortableList>

			{#if showForm}
				<form
					onsubmit={addLink}
					class="bg-base-200 m-2 mx-auto flex w-full flex-col items-center rounded-xl"
				>
					<select name="icon" class="select select-sm mb-2" bind:value={$formData.icon}>
						{#each icons as icon}
							<option value={icon.toLowerCase()}>{icon}</option>
						{/each}
					</select>
					<input
						name="title"
						type="text"
						placeholder="Title"
						class="input input-sm my-2"
						bind:value={$formData.title}
					/>
					<input
						name="url"
						type="text"
						placeholder="URL"
						class="input input-sm mt-2"
						bind:value={$formData.url}
					/>
					<div class="my-4">
						{#if !titleIsValid}
							<p class="text-error text-xs">Must have valid title</p>
						{/if}
						{#if !urlIsValid}
							<p class="text-error text-xs">Must have a valid URL</p>
						{/if}
						{#if formIsValid}
							<p class="text-success text-xs">Looks good!</p>
						{/if}
					</div>

					<button disabled={!formIsValid} type="submit" class="btn btn-success block">
						Add Link
					</button>

					<button type="button" class="btn btn-xs my-4" onclick={cancelLink}>Cancel</button>
				</form>
			{:else}
				<button
					onclick={() => (showForm = true)}
					class="btn btn-brand btn-hover btn-lg xl:btn-xl m-2"
				>
					Add a Link
				</button>
			{/if}
			<SignOut />
		{:else}
			<p>
				you're trying to access this page without signin: go to
				<a href="/login" class="badge badge-soft badge-neutral">https://onepoint/login</a>
				to signin and then come back.
			</p>
		{/if}
	</div>
</AuthCheck>
