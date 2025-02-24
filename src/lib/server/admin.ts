import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import pkg from 'firebase-admin'

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: import.meta.env.VITE_FB_PROJECT_ID,
            clientEmail: import.meta.env.VITE_FB_CLIENT_EMAIL,
            privateKey: import.meta.env.VITE_FB_PRIVATE_KEY
        })
    })
} catch (err:any) {
    if(!/already exists/u.test(err.message)) {
        console.error('Firebase Admin Error: ', err.stack)
    }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();