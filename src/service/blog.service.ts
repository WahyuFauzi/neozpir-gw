import axios from 'axios';
import { getJwt } from './auth.service';

const baseUrl = ''; // You might want to configure this properly, e.g., from environment variables

export async function getBlogByLangkey(langKey: string): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}/api/blog/${langKey}`); // Example API endpoint
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
}

export async function createBlogPost(postData: any): Promise<any> {
  try {
    const token = await getJwt();
    if (!token) {
      throw new Error('Not authenticated');
    }
    const response = await axios.post(`${baseUrl}/api/blog`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateBlogPost(langKey: string, title: string, postData: any): Promise<any> {
  try {
    const token = await getJwt();
    if (!token) {
      throw new Error('Not authenticated');
    }
    const response = await axios.put(`${baseUrl}/api/blog/${langKey}/${title}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}