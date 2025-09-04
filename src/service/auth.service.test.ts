import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthService from '../service/auth.service';
import { Client, Account, ID } from 'appwrite';

// Mock Appwrite dependencies
vi.mock('appwrite', () => {
    const mockAccount = {
        create: vi.fn(),
        createEmailPasswordSession: vi.fn(),
        createVerification: vi.fn(),
        updateVerification: vi.fn(),
        get: vi.fn(),
        deleteSession: vi.fn(),
        createJWT: vi.fn(),
        createRecovery: vi.fn(),
        updateRecovery: vi.fn(),
    };

    const mockClient = {
        setEndpoint: vi.fn().mockReturnThis(),
        setProject: vi.fn().mockReturnThis(),
    };

    return {
        Client: vi.fn(() => mockClient),
        Account: vi.fn(() => mockAccount),
        ID: {
            unique: vi.fn(() => 'unique-id'),
        },
    };
});

describe('AuthService', () => {
    let authService: AuthService;
    let mockAccount: ReturnType<typeof Account>;
    let mockClient: ReturnType<typeof Client>;

    beforeEach(() => {
        // Reset mocks before each test
        vi.clearAllMocks();

        // Set environment variables for the test
        import.meta.env.VITE_APPWRITE_ENDPOINT = 'http://localhost/v1';
        import.meta.env.VITE_APPWRITE_PROJECT_ID = 'test_project_id';
        import.meta.env.VITE_BASE_URL = 'http://localhost:3000';

        authService = new AuthService();
        mockClient = (Client as any).mock.results[0].value;
        mockAccount = new Account(mockClient);
    });

    it('should initialize Appwrite client and account', () => {
        expect(Client).toHaveBeenCalledTimes(1);
        expect(mockClient.setEndpoint).toHaveBeenCalledWith('http://localhost/v1');
        expect(mockClient.setProject).toHaveBeenCalledWith('test_project_id');
        expect(Account).toHaveBeenCalledWith(mockClient);
    });

    describe('createUser', () => {
        it('should create a user, session, and initiate email verification', async () => {
            mockAccount.create.mockResolvedValue({ $id: 'user123', email: 'test@example.com' });
            mockAccount.createEmailPasswordSession.mockResolvedValue({});
            mockAccount.createVerification.mockResolvedValue({});

            const user = await authService.createUser('test@example.com', 'password123', 'Test User');

            expect(ID.unique).toHaveBeenCalledTimes(1);
            expect(mockAccount.create).toHaveBeenCalledWith('unique-id', 'test@example.com', 'password123', 'Test User');
            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockAccount.createVerification).toHaveBeenCalledWith('http://localhost:3000/verify-email');
            expect(user).toEqual({ $id: 'user123', email: 'test@example.com' });
        });

        it('should throw an error if user creation fails', async () => {
            const error = new Error('Failed to create user');
            mockAccount.create.mockRejectedValue(error);

            await expect(authService.createUser('test@example.com', 'password123')).rejects.toThrow(error);
            expect(mockAccount.create).toHaveBeenCalledTimes(1);
            expect(mockAccount.createEmailPasswordSession).not.toHaveBeenCalled();
            expect(mockAccount.createVerification).not.toHaveBeenCalled();
        });
    });

    describe('completeEmailVerification', () => {
        it('should successfully complete email verification', async () => {
            mockAccount.updateVerification.mockResolvedValue({});

            await authService.completeEmailVerification('user123', 'secret123');

            expect(mockAccount.updateVerification).toHaveBeenCalledWith('user123', 'secret123');
        });

        it('should throw an error if email verification fails', async () => {
            const error = new Error('Failed to verify email');
            mockAccount.updateVerification.mockRejectedValue(error);

            await expect(authService.completeEmailVerification('user123', 'secret123')).rejects.toThrow(error);
            expect(mockAccount.updateVerification).toHaveBeenCalledTimes(1);
        });
    });

    describe('loginUser', () => {
        it('should successfully log in a user', async () => {
            const session = { $id: 'session123' };
            mockAccount.createEmailPasswordSession.mockResolvedValue(session);

            const result = await authService.loginUser('test@example.com', 'password123');

            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(result).toEqual(session);
        });

        it('should throw an error if login fails', async () => {
            const error = new Error('Invalid credentials');
            mockAccount.createEmailPasswordSession.mockRejectedValue(error);

            await expect(authService.loginUser('test@example.com', 'wrongpassword')).rejects.toThrow(error);
            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledTimes(1);
        });
    });

    describe('getCurrentUser', () => {
        it('should return the current user if logged in', async () => {
            const user = { $id: 'user123', email: 'test@example.com' };
            mockAccount.get.mockResolvedValue(user);

            const result = await authService.getCurrentUser();

            expect(mockAccount.get).toHaveBeenCalledTimes(1);
            expect(result).toEqual(user);
        });

        it('should return null if no user is logged in', async () => {
            mockAccount.get.mockRejectedValue(new Error('User not found')); // Appwrite throws error if no user
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});


            const result = await authService.getCurrentUser();

            expect(mockAccount.get).toHaveBeenCalledTimes(1);
            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith("No user logged in or error fetching user:", expect.any(Error));
            consoleSpy.mockRestore();
        });

        it('should re-throw if another error occurs during get current user', async () => {
            const error = new Error('Network error');
            mockAccount.get.mockRejectedValue(error);
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});


            const result = await authService.getCurrentUser();

            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith("No user logged in or error fetching user:", error);
            consoleSpy.mockRestore();
        });
    });

    describe('logoutUser', () => {
        it('should successfully log out the user', async () => {
            mockAccount.deleteSession.mockResolvedValue({});

            await authService.logoutUser();

            expect(mockAccount.deleteSession).toHaveBeenCalledWith('current');
        });

        it('should throw an error if logout fails', async () => {
            const error = new Error('Failed to delete session');
            mockAccount.deleteSession.mockRejectedValue(error);

            await expect(authService.logoutUser()).rejects.toThrow(error);
            expect(mockAccount.deleteSession).toHaveBeenCalledTimes(1);
        });
    });

    describe('getJwt', () => {
        it('should return the JWT if a session exists', async () => {
            mockAccount.createJWT.mockResolvedValue({ jwt: 'mock-jwt-token' });

            const jwt = await authService.getJwt();

            expect(mockAccount.createJWT).toHaveBeenCalledTimes(1);
            expect(jwt).toBe('mock-jwt-token');
        });

        it('should return null if no session exists or JWT creation fails', async () => {
            mockAccount.createJWT.mockRejectedValue(new Error('No session'));
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});


            const jwt = await authService.getJwt();

            expect(mockAccount.createJWT).toHaveBeenCalledTimes(1);
            expect(jwt).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith("Appwrite: Error getting JWT:", expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('forgotPassword', () => {
        it('should successfully initiate password recovery', async () => {
            mockAccount.createRecovery.mockResolvedValue({});

            await authService.forgotPassword('test@example.com', 'http://localhost:3000/reset-password');

            expect(mockAccount.createRecovery).toHaveBeenCalledWith('test@example.com', 'http://localhost:3000/reset-password');
        });

        it('should throw an error if password recovery initiation fails', async () => {
            const error = new Error('Failed to send recovery email');
            mockAccount.createRecovery.mockRejectedValue(error);

            await expect(authService.forgotPassword('test@example.com', 'http://localhost:3000/reset-password')).rejects.toThrow(error);
            expect(mockAccount.createRecovery).toHaveBeenCalledTimes(1);
        });
    });

    describe('resetPassword', () => {
        it('should successfully reset the password', async () => {
            mockAccount.updateRecovery.mockResolvedValue({});

            await authService.resetPassword('user123', 'secret123', 'newpassword123');

            expect(mockAccount.updateRecovery).toHaveBeenCalledWith('user123', 'secret123', 'newpassword123');
        });

        it('should throw an error if password reset fails', async () => {
            const error = new Error('Failed to reset password');
            mockAccount.updateRecovery.mockRejectedValue(error);

            await expect(authService.resetPassword('user123', 'secret123', 'newpassword123')).rejects.toThrow(error);
            expect(mockAccount.updateRecovery).toHaveBeenCalledTimes(1);
        });
    });
});
