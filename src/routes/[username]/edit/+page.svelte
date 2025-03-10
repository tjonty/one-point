<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { db, trackEvent } from '$lib/firebase';
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
			icon: 'linkIcon',
			title: '',
			url: 'https://'
		});

		showForm = false;

		trackEvent('link_submission', {
			form_name: 'add_link_form',
			status: 'success'
		});
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

		trackEvent('btn_click', {
			btn_name: 'delete_link',
			status: 'success'
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
	<div class="mx-auto flex w-11/12 flex-col items-center gap-8 p-4 uppercase md:w-4/5 lg:w-1/2">
		{#if $userData?.username === $page.params.username}
			<h2 class="text-xl">Edit your profile</h2>

			<p class="flex flex-col items-center">
				Access your profile:
				<br />
				<span class="text-success text-xl lowercase">
					<a href={`https://onepoint.it.com/${$userData.username}`}>
						@{$userData.username}
					</a>
				</span>
			</p>

			<a href="/login/photo" class="badge badge-soft badge-neutral"> change profile photo </a>

			<form class="form-control text-xs">
				<label class="label flex cursor-pointer items-start justify-center">
					<span class="label-text mr-6">
						<div
							class="tooltip group-hover:tooltip-open"
							data-tip="If public, the world can see your profile"
							class:text-success={$userData?.isPublic}
							class:text-error={!$userData?.isPublic}
						>
							{$userData?.isPublic ? 'Public profile' : 'Private profile'}
						</div>
					</span>
					<input
						type="checkbox"
						class=" toggle toggle-xs text-error checked:text-success"
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
							class="btn btn-xs btn-error absolute -right-6 bottom-9 transition-all group-hover:visible"
						>
							Delete
						</button>
					</div>
				{/snippet}
			</SortableList>

			{#if showForm}
				<form
					onsubmit={addLink}
					class="mx-auto flex w-full flex-col items-center gap-4 rounded-xl border-2 border-white p-8 text-black"
				>
					<select name="icon" class="select select-sm" bind:value={$formData.icon}>
						{#each icons as icon}
							<option value={icon.toLowerCase()}>
								{icon}
							</option>
						{/each}
					</select>
					<input
						name="title"
						type="text"
						placeholder="Title"
						class="input input-sm"
						bind:value={$formData.title}
					/>
					<input
						name="url"
						type="text"
						placeholder="URL"
						class="input input-sm"
						bind:value={$formData.url}
					/>
					<div>
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

					<button disabled={!formIsValid} type="submit" class="btn btn-brand btn-success">
						Add Link
					</button>

					<button type="button" class="btn btn-xs" onclick={cancelLink}>Cancel</button>
				</form>
			{:else}
				<button
					onclick={() => (showForm = true)}
					class="btn btn-brand btn-hover btn-lg xl:btn-xl w-7/12"
				>
					Add a Link
				</button>
			{/if}
		{:else}
			<p>
				you're trying to access this page without signin.
				<a href="/" class="btn btn-brand btn-hover btn-lg xl:btn-xl mx-auto w-fit">
					Visit Home Page
				</a>
			</p>
		{/if}
	</div>
</AuthCheck>
