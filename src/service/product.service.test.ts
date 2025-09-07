import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import ProductService from './product.service';

// Mock axios
vi.mock('axios');

describe('ProductService', () => {
    let productService: ProductService;
    const baseUrl = 'http://localhost:8787';

    beforeEach(() => {
        vi.clearAllMocks();
        productService = new ProductService(baseUrl);
    });

    it('should be initialized with a base URL', () => {
        expect(productService).toBeInstanceOf(ProductService);
        // @ts-ignore private property access for testing
        expect(productService.baseUrl).toBe(baseUrl);
    });

    describe('getAllPlans', () => {
        it('should fetch all plans for a given language key', async () => {
            const mockData = [{ id: 1, name: 'Basic Plan' }];
            (axios.get as any).mockResolvedValue({ data: mockData });

            const result = await productService.getAllPlans('en');

            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/product/shopify?langKey=en`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if fetching all plans fails', async () => {
            const error = new Error('Network Error');
            (axios.get as any).mockRejectedValue(error);

            await expect(productService.getAllPlans('en')).rejects.toThrow(error);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/product/shopify?langKey=en`);
        });
    });

    describe('getEnterprisePlans', () => {
        it('should fetch enterprise plans for a given language key', async () => {
            const mockData = [{ id: 2, name: 'Enterprise Plan' }];
            (axios.get as any).mockResolvedValue({ data: mockData });

            const result = await productService.getEnterprisePlans('id');

            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/product/enterprise?langKey=id`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if fetching enterprise plans fails', async () => {
            const error = new Error('Server Error');
            (axios.get as any).mockRejectedValue(error);

            await expect(productService.getEnterprisePlans('id')).rejects.toThrow(error);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/product/enterprise?langKey=id`);
        });
    });

    describe('getAutomationPlans', () => {
        it('should fetch automation plans for a given language key', async () => {
            const mockData = [{ id: 3, name: 'Automation Plan' }];
            (axios.get as any).mockResolvedValue({ data: mockData });

            const result = await productService.getAutomationPlans('en');

            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/product/automation?langKey=en`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if fetching automation plans fails', async () => {
            const error = new Error('Request Failed');
            (axios.get as any).mockRejectedValue(error);

            await expect(productService.getAutomationPlans('en')).rejects.toThrow(error);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/product/automation?langKey=en`);
        });
    });
});
