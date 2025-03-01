<script lang="ts">
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		user && console.log('user securely signed in.');
	}
</script>

<button on:click={signInWithGoogle} class="btn btn-soft m-4">Sign in with Google</button>
