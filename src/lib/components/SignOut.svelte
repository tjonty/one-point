<script>
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	async function singoutSSR() {
		const res = await fetch('/api/signout', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

<button on:click={() => singoutSSR()} class="btn btn-brand btn-hover btn-lg xl:btn-xl">
	Sign out
</button>
