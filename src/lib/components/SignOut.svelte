<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	let className = '';
	export { className as class };

	const defaultClasses = 'btn btn-brand btn-hover btn-lg xl:btn-xl mx-auto w-9/12';

	async function singoutSSR() {
		const res = await fetch('/api/signout', { method: 'DELETE' });
		await signOut(auth);
		await goto('/');
	}
</script>

<button on:click={() => singoutSSR()} class={className ? className : defaultClasses}>
	Sign out
</button>
