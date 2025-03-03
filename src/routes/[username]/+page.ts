import { collection, doc, getDocs, limit, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {

    const collectionRef = collection(db, "users");

    const q = query(collectionRef,
        where("username", "==", params.username),
        limit(1)
    )

    const snapshot = await getDocs(q);

    const exists = snapshot.docs[0]?.exists();

    if (!exists) {
        throw error(404, 'user does not exist!');
    }

    const data = snapshot.docs[0]?.data();

    if (!data.published) {
        throw error(403, `The profile is not public!`)
    }

    return {
        username: data.username,
        ImageURL: data.ImageURL,
        bio: data.bio,
        links: data.links ?? []
    };
}) satisfies PageLoad;