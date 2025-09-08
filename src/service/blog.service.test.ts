import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import BlogService from './blog.service';
import AuthService from './auth.service';

// Mock axios
vi.mock('axios');

// Mock AuthService
vi.mock('./auth.service', () => {
    const mockAuthService = {
        getJwt: vi.fn(),
    };
    return {
        default: vi.fn(() => mockAuthService),
    };
});

describe('BlogService', () => {
    let blogService: BlogService;
    let mockAuthService: AuthService;
    const baseUrl = 'http://localhost:8787';

    beforeEach(() => {
        vi.clearAllMocks();
        blogService = new BlogService(baseUrl);
        mockAuthService = new AuthService();
    });

    it('should be initialized with a base URL', () => {
        expect(blogService).toBeInstanceOf(BlogService);
        // @ts-ignore private property access for testing
        expect(blogService.baseUrl).toBe(baseUrl);
    });

    describe('getBlogByLangkey', () => {
        it('should fetch blog posts for a given language key', async () => {
            const mockData = [{ id: 1, title: 'Test Blog Post' }];
            (axios.get as any).mockResolvedValue({ data: mockData });

            const result = await blogService.getBlogByLangkey('en');

            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/blog/en`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if fetching blog posts fails', async () => {
            const error = new Error('Network Error');
            (axios.get as any).mockRejectedValue(error);

            await expect(blogService.getBlogByLangkey('en')).rejects.toThrow(error);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/blog/en`);
        });
    });

    describe('createBlogPost', () => {
        const postData = { title: 'New Post', content: 'Content' };

        it('should create a blog post with a valid token', async () => {
            (mockAuthService.getJwt as any).mockResolvedValue('mock-jwt-token');
            const mockResponse = { message: 'Post created' };
            (axios.post as any).mockResolvedValue({ data: mockResponse });

            const result = await blogService.createBlogPost(postData);

            expect(mockAuthService.getJwt).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/api/blog`, postData, {
                headers: { Authorization: 'Bearer mock-jwt-token' },
            });
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error if not authenticated', async () => {
            (mockAuthService.getJwt as any).mockResolvedValue(null);

            await expect(blogService.createBlogPost(postData)).rejects.toThrow('Not authenticated');
            expect(mockAuthService.getJwt).toHaveBeenCalledTimes(1);
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should throw an error if creating blog post fails', async () => {
            (mockAuthService.getJwt as any).mockResolvedValue('mock-jwt-token');
            const error = new Error('Server Error');
            (axios.post as any).mockRejectedValue(error);

            await expect(blogService.createBlogPost(postData)).rejects.toThrow(error);
            expect(mockAuthService.getJwt).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/api/blog`, postData, {
                headers: { Authorization: 'Bearer mock-jwt-token' },
            });
        });
    });

    describe('updateBlogPost', () => {
        const postData = { content: 'Updated Content' };
        const langKey = 'en';
        const title = 'Test-Blog-Post';

        it('should update a blog post with a valid token', async () => {
            (mockAuthService.getJwt as any).mockResolvedValue('mock-jwt-token');
            const mockResponse = { message: 'Post updated' };
            (axios.put as any).mockResolvedValue({ data: mockResponse });

            const result = await blogService.updateBlogPost(langKey, title, postData);

            expect(mockAuthService.getJwt).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${baseUrl}/api/blog/${langKey}/${title}`, postData, {
                headers: { Authorization: 'Bearer mock-jwt-token' },
            });
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error if not authenticated', async () => {
            (mockAuthService.getJwt as any).mockResolvedValue(null);

            await expect(blogService.updateBlogPost(langKey, title, postData)).rejects.toThrow('Not authenticated');
            expect(mockAuthService.getJwt).toHaveBeenCalledTimes(1);
            expect(axios.put).not.toHaveBeenCalled();
        });

        it('should throw an error if updating blog post fails', async () => {
            (mockAuthService.getJwt as any).mockResolvedValue('mock-jwt-token');
            const error = new Error('Server Error');
            (axios.put as any).mockRejectedValue(error);

            await expect(blogService.updateBlogPost(langKey, title, postData)).rejects.toThrow(error);
            expect(mockAuthService.getJwt).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith(`${baseUrl}/api/blog/${langKey}/${title}`, postData, {
                headers: { Authorization: 'Bearer mock-jwt-token' },
            });
        });
    });
});
