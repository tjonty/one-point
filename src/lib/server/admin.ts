import pkg from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from "firebase-admin/firestore";

try {
    pkg.initializeApp({
        credential: pkg.credential.cert(JSON.parse(import.meta.env.VITE_FB_SERVICE_ACCOUNT))
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