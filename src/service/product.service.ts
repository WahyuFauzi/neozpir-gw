import axios from 'axios';

const baseUrl = ''; // You might want to configure this properly, e.g., from environment variables

export async function getAllPlans(langKey: string): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}/api/product/shopify?langKey=${langKey}`); // Example API endpoint
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
}

export async function getEnterprisePlans(langKey: string): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}/api/product/enterprise?langKey=${langKey}`); // Example API endpoint
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
}

export async function getAutomationPlans(langKey: string): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}/api/product/automation?langKey=${langKey}`); // Example API endpoint
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for further handling
  }
}
