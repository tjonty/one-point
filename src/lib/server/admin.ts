import pkg from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from "firebase-admin/firestore";

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: import.meta.env.VITE_FB_ADMIN_PROJECT_ID,
            clientEmail: import.meta.env.VITE_FB_ADMIN_CLIENT_EMAIL,
            privateKey: import.meta.env.VITE_FB_ADMIN_PRIVATE_KEY
        })
    })
} catch (err: any) {
    console.error('Firebase Admin initialization error:', err);
    throw err; // Stop execution if initialization fails
    if (!/already exists/u.test(err.message)) {
        console.error('Firebase Admin Error: ', err.stack)
    }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();