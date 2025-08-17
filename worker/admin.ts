import { Hono } from 'hono';

const admin = new Hono();

admin.post('/blog/:id', async (c) => {
});

export default admin;
