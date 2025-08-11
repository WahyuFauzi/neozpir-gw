import { Hono } from 'hono';
import { blogSchema } from './schemas';

const admin = new Hono();

admin.post('/blog/:id', async (c) => {
});

export default admin;
