import axios from 'axios';

class ProductService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl; // You might want to configure this properly, e.g., from environment variables
  }

  async getAllPlans(langKey: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/product/shopify?langKey=${langKey}`); // Example API endpoint
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error for further handling
    }
  }

  async getEnterprisePlans(langKey: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/product/enterprise?langKey=${langKey}`); // Example API endpoint
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error for further handling
    }
  }

  async getAutomationPlans(langKey: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/product/automation?langKey=${langKey}`); // Example API endpoint
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error for further handling
    }
  }
}

export default ProductService;
