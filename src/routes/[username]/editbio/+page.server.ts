import type { PageServerLoad } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { trackEvent } from "$lib/firebase";

export const load = (async ({ locals, params }) => {
    const uid = locals.userID;

    if (!uid) {
        throw redirect(301, "/login");
    }

    const userDoc = await adminDB.collection("users").doc(uid!).get();
    const { username, bio } = userDoc.data()!;

    if (params.username !== username) {
        throw error(401, "That username does not belong to you");
    }

    return {
        bio,
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ locals, request, params }) => {

        const uid = locals.userID;

        const data = await request.formData();
        const bio = data.get('bio');

        const userRef = adminDB.collection("users").doc(uid!);
        const { username } = (await userRef.get()).data()!;

        if (params.username !== username) {
            throw error(401, "That username does not belong to you");
        }

        trackEvent('form_submission', {
            form_name: 'user_bio_form',
            status: 'success',
        });

        await userRef.update({
            bio,
        });
    },
} satisfies Actions;