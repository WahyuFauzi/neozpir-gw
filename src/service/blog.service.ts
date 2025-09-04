import axios from 'axios';
import { authService } from './auth.service';

class BlogService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || ''; // You might want to configure this properly, e.g., from environment variables
  }

  async getBlogByLangkey(langKey: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/blog/${langKey}`); // Example API endpoint
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error for further handling
    }
  }

  async createBlogPost(postData: any): Promise<any> {
    try {
      const token = await authService.getJwt();
      if (!token) {
        throw new Error('Not authenticated');
      }
      const response = await axios.post(`${this.baseUrl}/api/blog`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateBlogPost(langKey: string, title: string, postData: any): Promise<any> {
    try {
      const token = await authService.getJwt();
      if (!token) {
        throw new Error('Not authenticated');
      }
      const response = await axios.put(`${this.baseUrl}/api/blog/${langKey}/${title}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const blogService = new BlogService();
