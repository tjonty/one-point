<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	let currentPath = $state('');

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ idToken })
		});

		if (res.ok) {
			afterNavigate(async (navigation) => {
				currentPath = navigation.to?.url.pathname as string;
				if (currentPath !== `/login`) {
					await goto('/login');
				}
			});
		}
	}
</script>

<div class="uppercase">
	<button onclick={signInWithGoogle} class="btn btn-brand btn-hover btn-lg xl:btn-xl">
		Sign in with Google
	</button>
</div>
