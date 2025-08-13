import { Client, Account, ID } from 'appwrite';

// Initialize Appwrite client
// Replace with your actual Appwrite endpoint and project ID
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'YOUR_APPWRITE_ENDPOINT') // Your Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || 'YOUR_APPWRITE_PROJECT_ID'); // Your project ID

const account = new Account(client);

/**
 * Creates a new user account.
 * @param email User's email.
 * @param password User's password.
 * @param name Optional: User's name.
 * @returns Promise resolving to the created user account.
 */
export const createUser = async (email: string, password: string, name?: string) => {
    try {
        const user = await account.create(ID.unique(), email, password, name);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

/**
 * Logs in a user with email and password.
 * @param email User's email.
 * @param password User's password.
 * @returns Promise resolving to the user session.
 */
export const loginUser = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

/**
 * Retrieves the currently logged-in user's account.
 * @returns Promise resolving to the current user's account or null if no user is logged in.
 */
export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        // If no user is logged in, account.get() will throw an error.
        // We can catch it and return null or re-throw if it's another type of error.
        console.log("No user logged in or error fetching user:", error);
        return null;
    }
};

/**
 * Logs out the current user by deleting their session.
 * @returns Promise resolving when the session is deleted.
 */
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};

/**
 * Retrieves the JWT for the current session.
 * @returns Promise resolving to the JWT string or null if no session exists.
 */
export const getJwt = async (): Promise<string | null> => {
    try {
        const jwt = await account.createJWT();
        return jwt.jwt;
    } catch (error) {
        console.error("Error getting JWT:", error);
        return null;
    }
};
