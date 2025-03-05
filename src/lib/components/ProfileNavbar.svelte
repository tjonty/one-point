<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { currentUser, userData } from '$lib/stores';
	import { page } from '$app/stores';
	import SignOut from './SignOut.svelte';

	let currentPath = $state('');

	afterNavigate(async (navigation) => {
		currentPath = navigation.to?.url.pathname as string;
	});
</script>

{#if $userData?.username === $page.params.username}
	<div class="navbar shadow-sm">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost md:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				</div>
				<ul
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 text-black shadow"
				>
					<li>
						<a
							href={`/${$userData?.username}`}
							class:nav-active={currentPath === `/${$userData?.username}`}
						>
							Public Profile
						</a>
					</li>
					<li>
						<a
							href={`/${$userData?.username}/edit`}
							class:nav-active={currentPath === `/${$userData?.username}/edit`}
						>
							Update Bio
						</a>
					</li>
					<li>
						<a
							href={`/${$userData?.username}/editbio`}
							class:nav-active={currentPath === `/${$userData?.username}/editbio`}
						>
							Update Bio
						</a>
					</li>
				</ul>
			</div>
			<a href="/" class="pl-4 text-xl">
				<img src="/images/favicon.png" alt="logo" class="h-12 w-12" />
			</a>
		</div>
		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1 text-xl">
				<li>
					<a
						href={`/${$userData?.username}`}
						class:nav-active={currentPath === `/${$userData?.username}`}
					>
						Public Profile
					</a>
				</li>
				<li>
					<a
						href={`/${$userData?.username}/edit`}
						class:nav-active={currentPath === `/${$userData?.username}/edit`}
					>
						Edit Mode
					</a>
				</li>
				<li>
					<a
						href={`/${$userData?.username}/editbio`}
						class:nav-active={currentPath === `/${$userData?.username}/editbio`}
					>
						Update Bio
					</a>
				</li>
			</ul>
		</div>
		<div class="navbar-end">
			{#if $currentUser}
				<SignOut class="btn btn-brand mr-4" />
			{/if}
		</div>
	</div>
{/if}
