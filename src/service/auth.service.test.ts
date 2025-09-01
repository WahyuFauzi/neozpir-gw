import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Client, Account, ID } from 'appwrite';
import { AuthService } from './auth.service';

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
            unique: vi.fn(() => 'unique_id'),
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
        authService = new AuthService();
        mockClient = new Client();
        mockAccount = new Account(mockClient);

        // Ensure environment variables are set for tests
        import.meta.env.VITE_APPWRITE_ENDPOINT = 'http://localhost/v1';
        import.meta.env.VITE_APPWRITE_PROJECT_ID = 'test_project_id';
        import.meta.env.VITE_BASE_URL = 'http://localhost:3000';
    });

    describe('createUser', () => {
        it('should create a user and session, then initiate email verification on success', async () => {
            const mockUser = { $id: 'user123', email: 'test@example.com' };
            mockAccount.create.mockResolvedValue(mockUser);
            mockAccount.createEmailPasswordSession.mockResolvedValue({});
            mockAccount.createVerification.mockResolvedValue({});

            const user = await authService.createUser('test@example.com', 'password123', 'Test User');

            expect(ID.unique).toHaveBeenCalled();
            expect(mockAccount.create).toHaveBeenCalledWith('unique_id', 'test@example.com', 'password123', 'Test User');
            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockAccount.createVerification).toHaveBeenCalledWith('http://localhost:3000/verify-email');
            expect(user).toEqual(mockUser);
        });

        it('should throw an error if user creation fails', async () => {
            const error = new Error('Failed to create user');
            mockAccount.create.mockRejectedValue(error);

            await expect(authService.createUser('test@example.com', 'password123')).rejects.toThrow(error);
            expect(mockAccount.create).toHaveBeenCalledTimes(1);
            expect(mockAccount.createEmailPasswordSession).not.toHaveBeenCalled();
            expect(mockAccount.createVerification).not.toHaveBeenCalled();
        });

        it('should throw an error if session creation fails after user creation', async () => {
            const mockUser = { $id: 'user123', email: 'test@example.com' };
            const error = new Error('Failed to create session');
            mockAccount.create.mockResolvedValue(mockUser);
            mockAccount.createEmailPasswordSession.mockRejectedValue(error);

            await expect(authService.createUser('test@example.com', 'password123')).rejects.toThrow(error);
            expect(mockAccount.create).toHaveBeenCalledTimes(1);
            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledTimes(1);
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
            const error = new Error('Verification failed');
            mockAccount.updateVerification.mockRejectedValue(error);

            await expect(authService.completeEmailVerification('user123', 'secret123')).rejects.toThrow(error);
            expect(mockAccount.updateVerification).toHaveBeenCalledTimes(1);
        });
    });

    describe('loginUser', () => {
        it('should successfully log in a user and return the session', async () => {
            const mockSession = { $id: 'session123' };
            mockAccount.createEmailPasswordSession.mockResolvedValue(mockSession);

            const session = await authService.loginUser('test@example.com', 'password123');

            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(session).toEqual(mockSession);
        });

        it('should throw an error if login fails', async () => {
            const error = new Error('Login failed');
            mockAccount.createEmailPasswordSession.mockRejectedValue(error);

            await expect(authService.loginUser('test@example.com', 'password123')).rejects.toThrow(error);
            expect(mockAccount.createEmailPasswordSession).toHaveBeenCalledTimes(1);
        });
    });

    describe('getCurrentUser', () => {
        it('should return the current user if logged in', async () => {
            const mockUser = { $id: 'user123', email: 'test@example.com' };
            mockAccount.get.mockResolvedValue(mockUser);

            const user = await authService.getCurrentUser();

            expect(mockAccount.get).toHaveBeenCalledTimes(1);
            expect(user).toEqual(mockUser);
        });

        it('should return null if no user is logged in', async () => {
            mockAccount.get.mockRejectedValue(new Error('User not logged in')); // Appwrite throws an error if no user is logged in

            const user = await authService.getCurrentUser();

            expect(mockAccount.get).toHaveBeenCalledTimes(1);
            expect(user).toBeNull();
        });

        it('should throw an error if fetching user fails for other reasons', async () => {
            const error = new Error('Network error');
            mockAccount.get.mockRejectedValue(error);

            await expect(authService.getCurrentUser()).rejects.toThrow(error);
            expect(mockAccount.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('logoutUser', () => {
        it('should successfully log out the user', async () => {
            mockAccount.deleteSession.mockResolvedValue({});

            await authService.logoutUser();

            expect(mockAccount.deleteSession).toHaveBeenCalledWith('current');
        });

        it('should throw an error if logout fails', async () => {
            const error = new Error('Logout failed');
            mockAccount.deleteSession.mockRejectedValue(error);

            await expect(authService.logoutUser()).rejects.toThrow(error);
            expect(mockAccount.deleteSession).toHaveBeenCalledTimes(1);
        });
    });

    describe('getJwt', () => {
        it('should return the JWT token on success', async () => {
            const mockJwt = { jwt: 'mock_jwt_token' };
            mockAccount.createJWT.mockResolvedValue(mockJwt);

            const jwt = await authService.getJwt();

            expect(mockAccount.createJWT).toHaveBeenCalledTimes(1);
            expect(jwt).toEqual('mock_jwt_token');
        });

        it('should return null if fetching JWT fails', async () => {
            mockAccount.createJWT.mockRejectedValue(new Error('Failed to get JWT'));

            const jwt = await authService.getJwt();

            expect(mockAccount.createJWT).toHaveBeenCalledTimes(1);
            expect(jwt).toBeNull();
        });
    });

    describe('forgotPassword', () => {
        it('should successfully initiate password recovery', async () => {
            mockAccount.createRecovery.mockResolvedValue({});

            await authService.forgotPassword('test@example.com', 'http://localhost:3000/reset-password');

            expect(mockAccount.createRecovery).toHaveBeenCalledWith('test@example.com', 'http://localhost:3000/reset-password');
        });

        it('should throw an error if password recovery initiation fails', async () => {
            const error = new Error('Recovery failed');
            mockAccount.createRecovery.mockRejectedValue(error);

            await expect(authService.forgotPassword('test@example.com', 'http://localhost:3000/reset-password')).rejects.toThrow(error);
            expect(mockAccount.createRecovery).toHaveBeenCalledTimes(1);
        });
    });

    describe('resetPassword', () => {
        it('should successfully reset the user's password', async () => {
            mockAccount.updateRecovery.mockResolvedValue({});

            await authService.resetPassword('user123', 'secret123', 'new_password');

            expect(mockAccount.updateRecovery).toHaveBeenCalledWith('user123', 'secret123', 'new_password');
        });

        it('should throw an error if password reset fails', async () => {
            const error = new Error('Reset failed');
            mockAccount.updateRecovery.mockRejectedValue(error);

            await expect(authService.resetPassword('user123', 'secret123', 'new_password')).rejects.toThrow(error);
            expect(mockAccount.updateRecovery).toHaveBeenCalledTimes(1);
        });
    });
});
