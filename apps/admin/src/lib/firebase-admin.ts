// Setup from: https://medium.com/@i190627/fetching-firebase-auth-users-using-the-admin-sdk-a-comprehensive-guide-f18c58687617

import admin from "firebase-admin";

function formatPrivateKey() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("FIREBASE_PRIVATE_KEY is not set in environment variables");
  }

  // Handle different formats of private key
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    // Remove surrounding quotes if present
    return JSON.parse(privateKey);
  }

  if (privateKey.includes("\\n")) {
    // Replace escaped newlines with actual newlines
    return privateKey.replace(/\\n/g, "\n");
  }

  return privateKey;
}

function initializeFirebaseAdmin() {
  try {
    // Return existing instance if already initialized
    if (admin.apps.length > 0) {
      return admin.app();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!projectId || !clientEmail) {
      throw new Error(
        "Missing Firebase configuration in environment variables",
      );
    }

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: formatPrivateKey(),
      }),
    });
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
    throw error;
  }
}

// Initialize Firebase Admin SDK
let firebaseAdmin: admin.app.App;
try {
  firebaseAdmin = initializeFirebaseAdmin();
} catch (error) {
  console.error("Failed to initialize Firebase Admin:", error);
  throw error;
}

// Export services needed
export const firestore = firebaseAdmin.firestore();
