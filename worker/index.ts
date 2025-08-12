import { Hono } from 'hono';
import admin from './admin.ts';
import product from './product.ts';
import blog from './blog.ts';

const app = new Hono();
app.route('/api/admin', admin);
app.route('/api/product', product);
app.route('/api/blog', blog);

export default app;
