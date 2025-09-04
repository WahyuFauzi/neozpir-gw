import { Client, Account, ID } from 'appwrite';

class AuthService {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client()
            .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'YOUR_APPWRITE_ENDPOINT') // Your Appwrite Endpoint
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || 'YOUR_APPWRITE_PROJECT_ID'); // Your project ID

        this.account = new Account(this.client);
    }

    /**
     * Creates a new user account.
     * @param email User's email.
     * @param password User's password.
     * @param name Optional: User's name.
     * @returns Promise resolving to the created user account.
     */
    async createUser(email: string, password: string, name?: string) {
        try {
            const userId = ID.unique()
            const user = await this.account.create(userId, email, password, name);
            await this.account.createEmailPasswordSession(email, password);
            await this.account.createVerification(`${import.meta.env.VITE_BASE_URL}/verify-email`);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    };

    /**
     * Completes the email verification process.
     * @param userId The user ID from the verification link.
     * @param secret The secret from the verification link.
     * @returns Promise resolving when the verification is updated.
     */
    async completeEmailVerification(userId: string, secret: string) {
        try {
            await this.account.updateVerification(userId, secret);
            console.log("Email verification successful.");
        } catch (error) {
            console.error("Error completing email verification:", error);
            throw error;
        }
    };

    /**
     * Logs in a user with email and password.
     * @param email User's email.
     * @param password User's password.
     * @returns Promise resolving to the user session.
     */
    async loginUser(email: string, password: string) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
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
    async getCurrentUser() {
        try {
            const user = await this.account.get();
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
    async logoutUser() {
        try {
            await this.account.deleteSession('current');
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
    async getJwt(): Promise<string | null> {
        try {
            const jwt = await this.account.createJWT();
            return jwt.jwt;
        } catch (error) {
            console.error("Appwrite: Error getting JWT:", error);
            return null;
        }
    };

    /**
     * Initiates the password recovery process.
     * @param email User's email for password recovery.
     * @param url The URL to redirect the user to after successful recovery initiation.
     * @returns Promise resolving when the recovery email is sent.
     */
    async forgotPassword(email: string, url: string) {
        try {
            await this.account.createRecovery(email, url);
            console.log("Password recovery email sent.");
        } catch (error) {
            console.error("Error initiating password recovery:", error);
            throw error;
        }
    };

    /**
     * Completes the password reset process.
     * @param userId The user ID from the recovery link.
     * @param secret The secret from the recovery link.
     * @param password The new password.
     * @returns Promise resolving when the password is updated.
     */
    async resetPassword(userId: string, secret: string, password: string) {
        try {
            await this.account.updateRecovery(userId, secret, password);
            console.log("Password reset successful.");
        } catch (error) {
            console.error("Error resetting password:", error);
            throw error;
        }
    };
}

export default AuthService;
