<script lang="ts">
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
	}
</script>

<div class="uppercase">
	<button on:click={signInWithGoogle} class="btn btn-brand btn-hover btn-lg xl:btn-xl">
		Sign in with Google
	</button>
</div>
