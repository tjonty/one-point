import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {

    const { idToken } = await request.json();

    const expiresIn = 24 * 7 * 60 * 60 * 1000;

    const decodedIdToken = await adminAuth.verifyIdToken(idToken);

    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
        const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

        cookies.set('__session', cookie, options);

        return json({ status: 'signedIn' })
    } else {
        throw error(401, 'Recent user sign in required');
    }
}