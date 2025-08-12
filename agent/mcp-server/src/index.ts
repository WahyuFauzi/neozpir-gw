import 'dotenv/config';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from 'axios';
import { blogPostSchema, blogPostUpdateSchema } from "./schemas.js";

// Base URL for the API. You can move this to an environment variable.
// @ts-ignore
const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:8787/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Tool to create a new blog post via API
server.registerTool(
  "createBlogPost",
  {
    title: "Create Blog Post",
    description: "Creates a new blog post via API.",
    inputSchema: { blogPostSchema }
  },
  async ({ blogPostSchema }) => {
    try {
      const response = await apiClient.post(`/blog`, blogPostSchema);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data) }]
      };
    } catch (error) {
        const axiosError = error as any;
        const errorMessage = axiosError.response ? JSON.stringify(axiosError.response.data) : axiosError.message;
        return {
            content: [{ type: "text", text: `Error creating blog post: ${errorMessage}` }]
        };
    }
  }
)

// Tool to update an existing blog post via API
server.registerTool(
  "updateBlogPost",
  {
    title: "Update Blog Post",
    description: "Updates an existing blog post via API.",
    inputSchema: {
        langkey: z.string(),
        title: z.string(),
        updates: blogPostUpdateSchema
    }
  },
  async ({ langkey, title, updates }) => {
    try {
      const response = await apiClient.put(`/blog/${langkey}/${title}`, updates);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data) }]
      };
    } catch (error) {
        const axiosError = error as any;
        const errorMessage = axiosError.response ? JSON.stringify(axiosError.response.data) : axiosError.message;
        return {
            content: [{ type: "text", text: `Error updating blog post: ${errorMessage}` }]
        };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
